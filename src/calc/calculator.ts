import { StardewDate } from "./calendar";
import { Crop } from "./crop";
import * as R from "remeda";
import { Vendor } from "./model";

export function canIPlant(
  crop: Crop,
  dt: StardewDate,
  vendors: Vendor[]
): { profit: number; plotFreeAt: StardewDate; buyFrom: Vendor } | undefined {
  if (!crop.canGrowOn(dt)) return;

  const bestVendorAndPrice = crop.bestVendorFrom(vendors);
  if (!bestVendorAndPrice) return;

  const maturityDate = dt.addDays(crop.maturityTimeDays);
  if (!maturityDate || !crop.canGrowOn(maturityDate)) return;

  const profit = crop.sellPrice - bestVendorAndPrice.price;
  return {
    profit: profit,
    plotFreeAt: maturityDate,
    buyFrom: bestVendorAndPrice.vendor,
  };
}

export interface PlanEntry {
  plantAt: StardewDate;
  harvestAt: StardewDate;
  buyFrom: Vendor;
  crop: Crop;
  profit: number;
}

function dbgPlanOutput(plan: PlanEntry[]): string {
  return plan.map((p) => `${p.plantAt}-${p.crop.name}`).join(",");
}

interface Plan {
  profit: number;
  plan: PlanEntry[];
}

type BestPlanCache = Map<number, Plan>;

export interface PlanVariables {
  crops: Crop[];
  vendors: Vendor[];
}

export function buildPlan(
  startDate: StardewDate,
  variables: PlanVariables
): PlanEntry[] {
  const bestPlans = new Map<number, Plan>();
  return buildPlanWithCache(bestPlans, startDate, variables);
}

function buildPlanWithCache(
  bestPlans: BestPlanCache,
  startDate: StardewDate,
  variables: PlanVariables
): PlanEntry[] {
  const savedPlan = bestPlans.get(startDate.dayOfYear);
  if (savedPlan) return savedPlan.plan;

  // for each crop that we can plant on startDate
  const potentialCropsToPlant = variables.crops.flatMap((crop) => {
    const plantable = canIPlant(crop, startDate, variables.vendors);

    if (plantable) return [{ crop, plantable }];
    else return [];
  });

  if (potentialCropsToPlant.length === 0) {
    const nextSeason = startDate.nextSeason();
    if (nextSeason) {
      return buildPlanWithCache(bestPlans, nextSeason, variables);
    } else {
      return [];
    }
  }

  // otherwise build all the possible plans for those crops, and choose the most profitable
  const possiblePlans = potentialCropsToPlant.map((p) => {
    const thisCropPlanEntry: PlanEntry = {
      crop: p.crop,
      harvestAt: p.plantable.plotFreeAt,
      plantAt: startDate,
      profit: p.plantable.profit,
      buyFrom: p.plantable.buyFrom,
    };
    const plan = [
      thisCropPlanEntry,
      ...buildPlanWithCache(bestPlans, p.plantable.plotFreeAt, variables),
    ];

    return {
      plan,
      profit: R.sumBy(plan, (p) => p.profit),
    };
  });

  const bestPlan = R.maxBy(possiblePlans, (p) => p.profit) ?? {
    plan: [],
    profit: 0,
  };
  bestPlans.set(startDate.dayOfYear, bestPlan);
  return bestPlan.plan;
}
