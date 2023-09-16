import { Season, StardewDate } from "./calendar";

export enum Source {
  PIERRE,
  PIERRE_YEAR2_PLUS,
  JOJOMART,
  OASIS_SHOP,
  FESTIVALS,
  TRAVELLING_CART,
  CRAFTING_FROM_SKILL,
  CRAFTING_FROM_FRIENDSHIP,
}

export type Crop = {
  name: string;
  seedPrice: number;
  sellPrice: number;
  maturityTimeDays: number;
  seasons: Season[];
  sources: Source[];

  // see https://stardewvalleywiki.com/Modding:Crop_data#Chance_for_extra_harvest
  extraHarvestChance?: {
    minHarvest: number;
    maxHarvest: number;
    maxHarvestIncreasePerFarmingLevel: number;
    chanceForExtraCrops: number;
  };
};

export function canGrowCropOn(
  crop: Crop,
  dt: StardewDate | undefined
): boolean {
  if (!dt) return false;
  return crop.seasons.includes(dt.season);
}
