import { Season } from "./calendar";
import * as R from "remeda";

export interface Vendor {
  name: string;
}

export const Vendors = {
  pierre: { name: "General Store" },
  pierreYear2: { name: "General Store (Yr2+)" },
  joja: { name: "JojaMart" },
  oasis: { name: "Oasis Shop" },
  travellingCart: { name: "Travelling Cart" },
  eggFestival: { name: "Egg Festival" },
} satisfies Record<string, Vendor>;

export const ALL_VENDORS = R.values(Vendors);

export type VendorName = keyof typeof Vendors;

// shortcuts!
export const pierre = Vendors.pierre;
export const pierreYear2 = Vendors.pierreYear2;
export const joja = Vendors.joja;
export const oasis = Vendors.oasis;
export const eggFestival = Vendors.eggFestival;
export const travellingCart = Vendors.travellingCart;

export type RawCropData = {
  name: string;
  sellPrice: number;
  maturityTimeDays: number;
  regrowTimeDays?: number;
  seasons: Season[];

  // see https://stardewvalleywiki.com/Modding:Crop_data#Chance_for_extra_harvest
  extraHarvestChance?: {
    minHarvest: number;
    maxHarvest: number;
    maxHarvestIncreasePerFarmingLevel: number;
    chanceForExtraCrops: number;
  };
  price: Partial<Record<VendorName, number>>;
};
