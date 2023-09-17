import { expect, it } from "vitest";
import { Crop } from "./crop";
import { FALL, SUMMER, StardewDate, WINTER } from "./calendar";
import { eggFestival, joja, pierre } from "./model";

it("should correctly identify whether it can grow on a date", () => {
  const c = Crop.for({
    name: "test",
    sellPrice: 1,
    maturityTimeDays: 7,
    price: {},
    seasons: [SUMMER],
  });

  expect(c.canGrowOn(new StardewDate(FALL, 1))).toBe(false);
  expect(c.canGrowOn(new StardewDate(FALL, 2))).toBe(false);
  expect(c.canGrowOn(new StardewDate(SUMMER, 1))).toBe(true);
  expect(c.canGrowOn(new StardewDate(SUMMER, 5))).toBe(true);
  expect(c.canGrowOn(new StardewDate(WINTER, 1))).toBe(false);
});

it("should use the available prices to identify vendors", () => {
  const c = Crop.for({
    name: "test",
    sellPrice: 1,
    maturityTimeDays: 7,
    price: {
      pierre: 1,
      joja: 2,
    },
    seasons: [SUMMER],
  });

  expect(c.isSoldByOneOf([])).toBeFalsy();
  expect(c.isSoldByOneOf([eggFestival])).toBeFalsy();
  expect(c.isSoldByOneOf([pierre])).toBeTruthy();
  expect(c.isSoldByOneOf([joja])).toBeTruthy();
  expect(c.isSoldByOneOf([eggFestival, joja])).toBeTruthy();
});

it("should use the available prices to identify cheapest vendor", () => {
  const c = Crop.for({
    name: "test",
    sellPrice: 1,
    maturityTimeDays: 7,
    price: {
      pierre: 1,
      joja: 2,
    },
    seasons: [SUMMER],
  });

  expect(c.bestVendorFrom([])).toBeUndefined();
  expect(c.bestVendorFrom([pierre])).toEqual({ vendor: pierre, price: 1 });
  expect(c.bestVendorFrom([joja])).toEqual({ vendor: joja, price: 2 });
  expect(c.bestVendorFrom([pierre, joja])).toEqual({
    vendor: pierre,
    price: 1,
  });
});
