import { Crop } from "./model";

export function profitPerDay(crop: Crop): number {
  const totalProfit = crop.sellPrice - crop.seedPrice;
  const profitPerDay = totalProfit / crop.maturityTimeDays;
  return profitPerDay;
}
