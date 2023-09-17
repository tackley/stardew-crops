import { it, expect, describe } from "vitest";
import { PlanEntry, buildPlan, canIPlant } from "./calculator";
import { Crop, Source } from "./model";
import { FALL, SPRING, SUMMER, StardewDate, WINTER, svDate } from "./calendar";
import { crops } from "./data";

it("should be able to go 😈😈😈😈😈 mode", () => {
  const devious: string = "🥹😀🫠😧😵";
  expect(devious).toBe("🥹😀🫠😧😵");
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
      maturityTimeDays: 1,
      sellPrice: 20,
      seasons: [SPRING, SUMMER],
      sources: [Source.JOJAMART],
      price: {
        [Source.JOJAMART]: 10,
      },
    };
    expect(canIPlant(testCrop, new StardewDate(FALL, 1))).toBeUndefined();
  });

  it("should say yes if the crop isn't in season", () => {
    const testCrop: Crop = {
      name: "test crop",
      maturityTimeDays: 4,
      sellPrice: 20,
      seasons: [SPRING, SUMMER],
      sources: [Source.JOJAMART],
      price: {
        [Source.JOJAMART]: 10,
      },
    };
    expect(canIPlant(testCrop, new StardewDate(SPRING, 1))).toMatchObject({
      profit: 10,
      plotFreeAt: new StardewDate(SPRING, 5),
    });
  });

  it("should say no if the crop doesn't have time to grow", () => {
    const testCrop: Crop = {
      name: "test crop",
      maturityTimeDays: 4,
      sellPrice: 20,
      seasons: [SPRING, SUMMER],
      sources: [Source.JOJAMART],
      price: {
        [Source.JOJAMART]: 10,
      },
    };
    expect(canIPlant(testCrop, new StardewDate(SUMMER, 27))).toBeUndefined();
  });
});

describe("optimal sequence calculator", () => {
  it("should work in a very simple case", () => {
    const testCrop1: Crop = {
      name: "spring crop",
      maturityTimeDays: 13,
      sellPrice: 180,
      seasons: [SPRING],
      sources: [Source.JOJAMART],
      price: {
        [Source.JOJAMART]: 50,
      },
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
      maturityTimeDays: 10,
      sellPrice: 150,
      seasons: [WINTER],
      sources: [Source.JOJAMART],
      price: {
        [Source.JOJAMART]: 50,
      },
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
      maturityTimeDays: 13,
      sellPrice: 180,
      seasons: [SPRING],
      sources: [Source.JOJAMART],
      price: {
        [Source.JOJAMART]: 50,
      },
    };
    const testCrop2: Crop = {
      name: "summer crop",
      maturityTimeDays: 4,
      sellPrice: 50,
      seasons: [SUMMER],
      sources: [Source.JOJAMART],
      price: {
        [Source.JOJAMART]: 30,
      },
    };
    const testCrop3: Crop = {
      name: "fall crop",
      maturityTimeDays: 13,
      sellPrice: 210,
      seasons: [FALL],
      sources: [Source.JOJAMART],
      price: {
        [Source.JOJAMART]: 80,
      },
    };
    const testCrop4: Crop = {
      name: "cross-season crop",
      maturityTimeDays: 7,
      sellPrice: 100,
      seasons: [SPRING, SUMMER],
      sources: [Source.JOJAMART],
      price: {
        [Source.JOJAMART]: 50,
      },
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

it("should do something amazing with the real crops", () => {
  const result = buildPlan(crops, svDate(SPRING, 1));

  expect(result).toMatchInlineSnapshot(`
    [
      {
        "crop": {
          "maturityTimeDays": 6,
          "name": "Kale Seeds",
          "price": {
            "0": 70,
            "2": 87,
            "5": 502.5,
          },
          "seasons": [
            {
              "idx": 0,
              "name": "Spring",
              "offsetDays": 0,
            },
          ],
          "sellPrice": 110,
          "sources": [
            2,
            0,
            5,
          ],
        },
        "harvestAt": "Spring 7",
        "plantAt": "Spring 1",
        "profit": 40,
      },
      {
        "crop": {
          "maturityTimeDays": 13,
          "name": "Rhubarb Seeds",
          "price": {
            "3": 100,
            "5": 575,
          },
          "seasons": [
            {
              "idx": 0,
              "name": "Spring",
              "offsetDays": 0,
            },
          ],
          "sellPrice": 220,
          "sources": [
            3,
            5,
          ],
        },
        "harvestAt": "Spring 20",
        "plantAt": "Spring 7",
        "profit": 120,
      },
      {
        "crop": {
          "extraHarvestChance": {
            "chanceForExtraCrops": 0.02,
            "maxHarvest": 4,
            "maxHarvestIncreasePerFarmingLevel": 0,
            "minHarvest": 4,
          },
          "maturityTimeDays": 10,
          "name": "Coffee Bean",
          "price": {
            "5": 550,
          },
          "regrowTimeDays": 2,
          "seasons": [
            {
              "idx": 0,
              "name": "Spring",
              "offsetDays": 0,
            },
            {
              "idx": 1,
              "name": "Summer",
              "offsetDays": 28,
            },
          ],
          "sellPrice": 15,
          "sources": [
            5,
          ],
        },
        "harvestAt": "Summer 2",
        "plantAt": "Spring 20",
        "profit": -535,
      },
      {
        "crop": {
          "maturityTimeDays": 13,
          "name": "Starfruit Seeds",
          "price": {
            "3": 400,
            "5": 800,
          },
          "seasons": [
            {
              "idx": 1,
              "name": "Summer",
              "offsetDays": 28,
            },
          ],
          "sellPrice": 750,
          "sources": [
            0,
            5,
          ],
        },
        "harvestAt": "Summer 15",
        "plantAt": "Summer 2",
        "profit": 350,
      },
      {
        "crop": {
          "maturityTimeDays": 13,
          "name": "Starfruit Seeds",
          "price": {
            "3": 400,
            "5": 800,
          },
          "seasons": [
            {
              "idx": 1,
              "name": "Summer",
              "offsetDays": 28,
            },
          ],
          "sellPrice": 750,
          "sources": [
            0,
            5,
          ],
        },
        "harvestAt": "Summer 28",
        "plantAt": "Summer 15",
        "profit": 350,
      },
      {
        "crop": {
          "maturityTimeDays": 4,
          "name": "Wheat Seeds",
          "price": {
            "0": 10,
            "2": 12,
            "5": 550,
          },
          "seasons": [
            {
              "idx": 1,
              "name": "Summer",
              "offsetDays": 28,
            },
            {
              "idx": 2,
              "name": "Fall",
              "offsetDays": 56,
            },
          ],
          "sellPrice": 25,
          "sources": [
            2,
            0,
            5,
          ],
        },
        "harvestAt": "Fall 4",
        "plantAt": "Summer 28",
        "profit": 15,
      },
      {
        "crop": {
          "maturityTimeDays": 24,
          "name": "Rare Seed",
          "price": {
            "5": 1000,
          },
          "seasons": [
            {
              "idx": 2,
              "name": "Fall",
              "offsetDays": 56,
            },
          ],
          "sellPrice": 3000,
          "sources": [
            5,
          ],
        },
        "harvestAt": "Fall 28",
        "plantAt": "Fall 4",
        "profit": 2000,
      },
    ]
  `);
});

it.todo("should be able to get properties of crops");
it.todo("should be able to calculate harvests for regrowing crops");
