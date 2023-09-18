import { StardewDate } from "./calendar";
import { Crop } from "./crop";
import * as R from "remeda";
import { Vendor } from "./model";
import { time } from "node:console";

export interface PlanEntry {
  plantAt: StardewDate;
  harvestAt: StardewDate;
  buyFrom: Vendor;
  crop: Crop;
  profit: number;
  regrowCount: number;
}

function howManyTimesCanIGrow(
  crop: Crop,
  dt: StardewDate,
  growDays: number,
  regrowDays?: number
): StardewDate[] {
  if (!crop.canGrowOn(dt)) return [];

  const maturityDate = dt.addDays(growDays);
  if (!maturityDate || !crop.canGrowOn(maturityDate)) {
    return [];
  }

  if (regrowDays) {
    return [
      maturityDate,
      ...howManyTimesCanIGrow(crop, maturityDate, regrowDays, regrowDays),
    ];
  }

  return [maturityDate];
}

export function canIPlant(
  crop: Crop,
  dt: StardewDate,
  vendors: Vendor[]
): PlanEntry[] {
  if (!crop.canGrowOn(dt)) return [];

  const bestVendorAndPrice = crop.bestVendorFrom(vendors);
  if (!bestVendorAndPrice) return [];

  const whenCanIHarvest = howManyTimesCanIGrow(
    crop,
    dt,
    crop.maturityTimeDays,
    crop.regrowTimeDays
  );

  const result = whenCanIHarvest.map((harvestAt, idx) => ({
    profit: crop.sellPrice * (idx + 1) - bestVendorAndPrice.price,
    plantAt: dt,
    crop: crop,
    harvestAt: harvestAt,
    buyFrom: bestVendorAndPrice.vendor,
    regrowCount: idx,
  }));

  return result;
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
  const potentialCropsToPlant = variables.crops.flatMap((crop) =>
    canIPlant(crop, startDate, variables.vendors)
  );

  if (potentialCropsToPlant.length === 0) {
    const nextSeason = startDate.nextSeason();
    if (nextSeason) {
      return buildPlanWithCache(bestPlans, nextSeason, variables);
    } else {
      return [];
    }
  }

  // otherwise build all the possible plans for those crops, and choose the most profitable
  const possiblePlans = potentialCropsToPlant.map((entry) => {
    const plan = [
      entry,
      ...buildPlanWithCache(bestPlans, entry.harvestAt, variables),
    ];

    return {
      plan,
      profit: R.sumBy(plan, (p) => p.profit),
    };
  });

  const bestPlan = R.pipe(
    possiblePlans,
    R.sortBy((p) => p.plan.length),
    R.maxBy((p) => p.profit)
  ) ?? {
    plan: [],
    profit: 0,
  };
  bestPlans.set(startDate.dayOfYear, bestPlan);
  return bestPlan.plan;
}
