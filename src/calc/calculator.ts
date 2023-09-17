import _ from "lodash";
import { StardewDate } from "./calendar";
import { Crop, Source, canGrowCropOn } from "./model";

function calcBestPrice(crop: Crop): number | undefined {
  return _.min(Object.values(crop.price));
}

export function canIPlant(
  crop: Crop,
  dt: StardewDate
): { profit: number; plotFreeAt: StardewDate } | undefined {
  if (canGrowCropOn(crop, dt)) {
    const maturityDate = dt.addDays(crop.maturityTimeDays);
    if (maturityDate && canGrowCropOn(crop, maturityDate)) {
      const bestSeedPrice = calcBestPrice(crop);

      if (bestSeedPrice) {
        const profit = crop.sellPrice - bestSeedPrice;
        return { profit: profit, plotFreeAt: maturityDate };
      }
    }
  }
}

export interface PlanEntry {
  plantAt: StardewDate;
  harvestAt: StardewDate;
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

export function buildPlan(crops: Crop[], startDate: StardewDate): PlanEntry[] {
  const bestPlans = new Map<number, Plan>();
  return buildPlanWithCache(bestPlans, crops, startDate);
}

function buildPlanWithCache(
  bestPlans: BestPlanCache,
  crops: Crop[],
  startDate: StardewDate
): PlanEntry[] {
  const savedPlan = bestPlans.get(startDate.dayOfYear);
  if (savedPlan) return savedPlan.plan;

  // for each crop that we can plant on startDate
  const potentialCropsToPlant = crops.flatMap((crop) => {
    const plantable = canIPlant(crop, startDate);

    if (plantable) return [{ crop, plantable }];
    else return [];
  });

  if (potentialCropsToPlant.length === 0) {
    const nextSeason = startDate.nextSeason();
    if (nextSeason) {
      return buildPlanWithCache(bestPlans, crops, nextSeason);
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
    };
    const plan = [
      thisCropPlanEntry,
      ...buildPlanWithCache(bestPlans, crops, p.plantable.plotFreeAt),
    ];

    return {
      plan,
      profit: _.sumBy(plan, "profit"),
    };
  });

  const bestPlan = _.maxBy(possiblePlans, "profit") ?? { plan: [], profit: 0 };
  console.log(
    `${startDate}: profit ${bestPlan.profit} plan ${dbgPlanOutput(
      bestPlan.plan
    )}`
  );
  bestPlans.set(startDate.dayOfYear, bestPlan);
  return bestPlan.plan;
}
