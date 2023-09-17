import { Season, StardewDate } from "./calendar";

// this should be "Vendor"

export enum Source {
  PIERRE,
  PIERRE_YEAR2_PLUS,
  JOJAMART,
  OASIS_SHOP,
  EGG_FESTIVAL,
  TRAVELLING_CART,
}

export type Crop = {
  name: string;
  sellPrice: number;
  maturityTimeDays: number;
  regrowTimeDays?: number;
  seasons: Season[];
  sources: Source[];

  // see https://stardewvalleywiki.com/Modding:Crop_data#Chance_for_extra_harvest
  extraHarvestChance?: {
    minHarvest: number;
    maxHarvest: number;
    maxHarvestIncreasePerFarmingLevel: number;
    chanceForExtraCrops: number;
  };
  price: Partial<Record<Source, number>>;
};

export function canGrowCropOn(
  crop: Crop,
  dt: StardewDate | undefined
): boolean {
  if (!dt) return false;
  return crop.seasons.includes(dt.season);
}
