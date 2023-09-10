import { test, it, expect, describe } from "vitest";
import { PlanEntry, buildPlan, canIPlant, profitPerDay } from "./calculator";
import { Crop } from "./model";
import { FALL, SPRING, SUMMER, StardewDate, WINTER, svDate } from "./calendar";
import { crops } from "./data";

it("should be able to go 😈😈😈😈😈 mode", () => {
  const devious: string = "🥹😀🫠😧😵";
  expect(devious).toBe("🥹😀🫠😧😵");
});

it("should calculate basic profit per day", () => {
  const testCrop: Crop = {
    name: "test crop",
    seedPrice: 10,
    maturityTimeDays: 1,
    sellPrice: 20,
    seasons: [SPRING],
  };

  expect(profitPerDay(testCrop)).toBe(10);

  expect(
    profitPerDay({
      ...testCrop,
      seedPrice: 9,
    })
  ).toBe(11);

  expect(
    profitPerDay({
      ...testCrop,
      maturityTimeDays: 2,
    })
  ).toBe(5);
});

/*
The question I want to ask is:

can I plant the crop on this day?
if so, when will the tile become free, and what will the profit be?

*/
describe("can I plant it?", () => {
  it("should say no if the crop isn't in season", () => {
    const testCrop: Crop = {
      name: "test crop",
      seedPrice: 10,
      maturityTimeDays: 1,
      sellPrice: 20,
      seasons: [SPRING, SUMMER],
    };
    expect(canIPlant(testCrop, new StardewDate(FALL, 1))).toBeUndefined();
  });

  it("should say yes if the crop isn't in season", () => {
    const testCrop: Crop = {
      name: "test crop",
      seedPrice: 10,
      maturityTimeDays: 4,
      sellPrice: 20,
      seasons: [SPRING, SUMMER],
    };
    expect(canIPlant(testCrop, new StardewDate(SPRING, 1))).toMatchObject({
      profit: 10,
      plotFreeAt: new StardewDate(SPRING, 5),
    });
  });

  it("should say no if the crop doesn't have time to grow", () => {
    const testCrop: Crop = {
      name: "test crop",
      seedPrice: 10,
      maturityTimeDays: 4,
      sellPrice: 20,
      seasons: [SPRING, SUMMER],
    };
    expect(canIPlant(testCrop, new StardewDate(SUMMER, 27))).toBeUndefined();
  });
});

describe("optimal sequence calculator", () => {
  it("should work in a very simple case", () => {
    const testCrop1: Crop = {
      name: "spring crop",
      seedPrice: 50,
      maturityTimeDays: 13,
      sellPrice: 180,
      seasons: [SPRING],
    };

    const plan = buildPlan([testCrop1], svDate(SPRING, 1));

    expect(plan).toMatchObject<PlanEntry[]>([
      {
        crop: testCrop1,
        plantAt: svDate(SPRING, 1),
        harvestAt: svDate(SPRING, 14),
        profit: 130,
      },
      {
        crop: testCrop1,
        plantAt: svDate(SPRING, 14),
        harvestAt: svDate(SPRING, 27),
        profit: 130,
      },
    ]);
  });

  it("should work in a very simple case with WINTER crops", () => {
    const testCrop1: Crop = {
      name: "winter crop",
      seedPrice: 50,
      maturityTimeDays: 10,
      sellPrice: 150,
      seasons: [WINTER],
    };

    const plan = buildPlan([testCrop1], svDate(SPRING, 1));

    expect(plan).toMatchObject<PlanEntry[]>([
      {
        crop: testCrop1,
        plantAt: svDate(WINTER, 1),
        harvestAt: svDate(WINTER, 11),
        profit: 100,
      },
      {
        crop: testCrop1,
        plantAt: svDate(WINTER, 11),
        harvestAt: svDate(WINTER, 21),
        profit: 100,
      },
    ]);
  });

  it("should be able to find the best crop sequence", () => {
    const testCrop1: Crop = {
      name: "spring crop",
      seedPrice: 50,
      maturityTimeDays: 13,
      sellPrice: 180,
      seasons: [SPRING],
    };
    const testCrop2: Crop = {
      name: "summer crop",
      seedPrice: 30,
      maturityTimeDays: 4,
      sellPrice: 50,
      seasons: [SUMMER],
    };
    const testCrop3: Crop = {
      name: "fall crop",
      seedPrice: 80,
      maturityTimeDays: 13,
      sellPrice: 210,
      seasons: [FALL],
    };
    const testCrop4: Crop = {
      name: "cross-season crop",
      seedPrice: 50,
      maturityTimeDays: 7,
      sellPrice: 100,
      seasons: [SPRING, SUMMER],
    };

    const plan = buildPlan(
      [testCrop1, testCrop2, testCrop3, testCrop4],
      svDate(SPRING, 1)
    );

    expect(plan).toMatchObject<PlanEntry[]>([
      {
        crop: testCrop1,
        plantAt: svDate(SPRING, 1),
        harvestAt: svDate(SPRING, 14),
        profit: 130,
      },
      {
        crop: testCrop1,
        plantAt: svDate(SPRING, 14),
        harvestAt: svDate(SPRING, 27),
        profit: 130,
      },
      {
        crop: testCrop4,
        plantAt: svDate(SPRING, 27),
        harvestAt: svDate(SUMMER, 6),
        profit: 50,
      },
      {
        crop: testCrop4,
        plantAt: svDate(SUMMER, 6),
        harvestAt: svDate(SUMMER, 13),
        profit: 50,
      },
      {
        crop: testCrop4,
        plantAt: svDate(SUMMER, 13),
        harvestAt: svDate(SUMMER, 20),
        profit: 50,
      },
      {
        crop: testCrop4,
        plantAt: svDate(SUMMER, 20),
        harvestAt: svDate(SUMMER, 27),
        profit: 50,
      },
      {
        crop: testCrop3,
        plantAt: svDate(FALL, 1),
        harvestAt: svDate(FALL, 14),
        profit: 130,
      },
      {
        crop: testCrop3,
        plantAt: svDate(FALL, 14),
        harvestAt: svDate(FALL, 27),
        profit: 130,
      },
    ]);
  });
});

it.skip("should do something amazing with the real crops", () => {
  const result = buildPlan(crops, svDate(SPRING, 1));

  expect(result).toMatchInlineSnapshot();
});

it.todo("should be able to get properties of crops");
it.todo("should be able to calculate harvests for regrowing crops");
