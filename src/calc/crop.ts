import { cropData } from "./data";
import { RawCropData, Vendor, Vendors } from "./model";
import { StardewDate } from "./calendar";
import * as R from "remeda";

export class Crop {
  private prices: Array<{ vendor: Vendor; price: number }>;

  constructor(private data: RawCropData) {
    this.prices = R.toPairs
      .strict(data.price)
      .map(([vendorName, price]) => ({ vendor: Vendors[vendorName], price }));
  }

  get name(): string {
    return this.data.name;
  }

  get maturityTimeDays() {
    return this.data.maturityTimeDays;
  }

  get regrowTimeDays() {
    return this.data.regrowTimeDays;
  }

  get averageCropsPerHarvest(): number {
    const h = this.data.extraHarvestChance;

    if (!h) return 1;

    const averageHarvest = (h.minHarvest + h.maxHarvest) / 2;

    const actualHarvest = averageHarvest * (1 + h.chanceForExtraCrops);

    return actualHarvest;
  }

  canGrowOn(dt: StardewDate): boolean {
    return this.data.seasons.includes(dt.season);
  }

  isSoldByOneOf(vendors: Vendor[]): boolean {
    const crossover = R.pipe(
      this.prices,
      R.map((p) => p.vendor),
      R.intersection(vendors)
    );

    return !R.isEmpty(crossover);
  }

  bestVendorFrom(
    vendors: Vendor[]
  ): { vendor: Vendor; price: number } | undefined {
    return R.pipe(
      this.prices,
      R.intersectionWith(vendors, (p, v) => p.vendor === v),
      R.minBy((p) => p.price)
    );
  }

  get sellPrice() {
    return this.data.sellPrice;
  }

  static for(data: RawCropData) {
    return new Crop(data);
  }
}

export const ALL_CROPS = cropData.map(Crop.for);
