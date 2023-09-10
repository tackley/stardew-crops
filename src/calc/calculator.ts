import _ from "lodash";
import { StardewDate } from "./calendar";
import { Crop, canGrowCropOn } from "./model";

export function profitPerDay(crop: Crop): number {
  const totalProfit = crop.sellPrice - crop.seedPrice;
  const profitPerDay = totalProfit / crop.maturityTimeDays;
  return profitPerDay;
}

export function canIPlant(
  crop: Crop,
  dt: StardewDate
): { profit: number; plotFreeAt: StardewDate } | undefined {
  if (canGrowCropOn(crop, dt)) {
    const maturityDate = dt.addDays(crop.maturityTimeDays);
    if (maturityDate && canGrowCropOn(crop, maturityDate)) {
      const profit = crop.sellPrice - crop.seedPrice;
      return { profit: profit, plotFreeAt: maturityDate };
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

export function buildPlan(crops: Crop[], startDate: StardewDate): PlanEntry[] {
  // for each crop that we can plant on startDate
  const potentialCropsToPlant = crops.flatMap((crop) => {
    const plantable = canIPlant(crop, startDate);

    if (plantable) return [{ crop, plantable }];
    else return [];
  });

  if (potentialCropsToPlant.length === 0) {
    const nextSeason = startDate.nextSeason();
    if (nextSeason) {
      return buildPlan(crops, nextSeason);
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
      ...buildPlan(crops, p.plantable.plotFreeAt),
    ];

    return {
      plan,
      profit: _.sumBy(plan, "profit"),
    };
  });

  const bestPlan = _.maxBy(possiblePlans, "profit");
  if (bestPlan) {
    return bestPlan.plan;
  }

  return [];
}
