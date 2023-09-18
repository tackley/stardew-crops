import { it, expect, describe } from "vitest";
import { PlanEntry, buildPlan, canIPlant } from "./calculator";
import { ALL_VENDORS, RawCropData, Vendors, joja } from "./model";
import { FALL, SPRING, SUMMER, StardewDate, WINTER, svDate } from "./calendar";
import { ALL_CROPS, Crop } from "./crop";

it("should be able to go 😈😈😈😈😈 mode", () => {
  const devious: string = "🥹😀🫠😧😵";
  expect(devious).toBe("🥹😀🫠😧😵");
});

describe("can I plant it?", () => {
  it("should say no if the crop isn't in season", () => {
    const testCrop: RawCropData = {
      name: "test crop",
      maturityTimeDays: 1,
      sellPrice: 20,
      seasons: [SPRING, SUMMER],
      price: {
        joja: 10,
      },
    };
    expect(
      canIPlant(Crop.for(testCrop), new StardewDate(FALL, 1), ALL_VENDORS)
    ).toEqual([]);
  });

  it("should say no if the crop isn't sold by the filtered vendor", () => {
    const testCrop: RawCropData = {
      name: "test crop",
      maturityTimeDays: 1,
      sellPrice: 20,
      seasons: [SPRING, SUMMER],
      price: {
        joja: 10,
      },
    };
    expect(
      canIPlant(Crop.for(testCrop), new StardewDate(SUMMER, 1), [Vendors.oasis])
    ).toEqual([]);
  });

  it("should say yes if the crop is in season", () => {
    const testCrop: RawCropData = {
      name: "test crop",
      maturityTimeDays: 4,
      sellPrice: 20,
      seasons: [SPRING, SUMMER],
      price: {
        joja: 10,
      },
    };
    expect(
      canIPlant(Crop.for(testCrop), new StardewDate(SPRING, 1), ALL_VENDORS)
    ).toMatchObject([
      {
        profit: 10,
        harvestAt: new StardewDate(SPRING, 5),
      },
    ]);
  });

  it("should say no if the crop doesn't have time to grow", () => {
    const testCrop: RawCropData = {
      name: "test crop",
      maturityTimeDays: 4,
      sellPrice: 20,
      seasons: [SPRING, SUMMER],
      price: {
        joja: 10,
      },
    };
    expect(
      canIPlant(Crop.for(testCrop), new StardewDate(SUMMER, 27), ALL_VENDORS)
    ).toHaveLength(0);
  });

  it("should provide all potential options for regrowing crops", () => {
    const testCrop = Crop.for({
      name: "test crop",
      maturityTimeDays: 10,
      regrowTimeDays: 5,
      sellPrice: 20,
      seasons: [SPRING],
      price: {
        joja: 10,
      },
    });
    expect(
      canIPlant(testCrop, new StardewDate(SPRING, 1), ALL_VENDORS)
    ).toMatchObject([
      {
        profit: 10,
        plantAt: svDate(SPRING, 1),
        harvestAt: new StardewDate(SPRING, 11),
        buyFrom: joja,
        crop: testCrop,
      },
      {
        profit: 30,
        harvestAt: new StardewDate(SPRING, 16),
        buyFrom: joja,
      },
      {
        profit: 50,
        harvestAt: new StardewDate(SPRING, 21),
        buyFrom: joja,
      },
      {
        profit: 70,
        harvestAt: new StardewDate(SPRING, 26),
        buyFrom: joja,
      },
    ]);
  });
});

describe("optimal sequence calculator", () => {
  it("should work in a very simple case", () => {
    const testCrop1 = Crop.for({
      name: "spring crop",
      maturityTimeDays: 13,
      sellPrice: 180,
      seasons: [SPRING],
      price: {
        joja: 50,
      },
    });

    const plan = buildPlan(svDate(SPRING, 1), {
      crops: [testCrop1],
      vendors: ALL_VENDORS,
    });

    expect(plan).toMatchObject<PlanEntry[]>([
      {
        crop: testCrop1,
        plantAt: svDate(SPRING, 1),
        harvestAt: svDate(SPRING, 14),
        profit: 130,
        buyFrom: joja,
        regrowCount: 0,
      },
      {
        crop: testCrop1,
        plantAt: svDate(SPRING, 14),
        harvestAt: svDate(SPRING, 27),
        profit: 130,
        buyFrom: joja,
        regrowCount: 0,
      },
    ]);
  });

  it("should work in a very simple case with WINTER crops", () => {
    const testCrop1 = Crop.for({
      name: "winter crop",
      maturityTimeDays: 10,
      sellPrice: 150,
      seasons: [WINTER],
      price: {
        joja: 50,
      },
    });

    const plan = buildPlan(svDate(SPRING, 1), {
      crops: [testCrop1],
      vendors: ALL_VENDORS,
    });

    expect(plan).toMatchObject<PlanEntry[]>([
      {
        crop: testCrop1,
        plantAt: svDate(WINTER, 1),
        harvestAt: svDate(WINTER, 11),
        profit: 100,
        buyFrom: joja,
        regrowCount: 0,
      },
      {
        crop: testCrop1,
        plantAt: svDate(WINTER, 11),
        harvestAt: svDate(WINTER, 21),
        profit: 100,
        buyFrom: joja,
        regrowCount: 0,
      },
    ]);
  });

  it("should work for regrowing crops", () => {
    const testCrop1 = Crop.for({
      name: "regrowing spring crop",
      maturityTimeDays: 13,
      regrowTimeDays: 10,
      sellPrice: 180,
      seasons: [SPRING],
      price: {
        joja: 50,
      },
    });

    const plan = buildPlan(svDate(SPRING, 1), {
      crops: [testCrop1],
      vendors: ALL_VENDORS,
    });

    expect(plan).toMatchObject<PlanEntry[]>([
      {
        crop: testCrop1,
        plantAt: svDate(SPRING, 1),
        harvestAt: svDate(SPRING, 24),
        profit: 310,
        buyFrom: joja,
        regrowCount: 1,
      },
    ]);
  });

  it("should be able to find the best crop sequence", () => {
    const testCrop1 = Crop.for({
      name: "spring crop",
      maturityTimeDays: 13,
      sellPrice: 180,
      seasons: [SPRING],
      price: {
        joja: 50,
      },
    });
    const testCrop2 = Crop.for({
      name: "summer crop",
      maturityTimeDays: 4,
      sellPrice: 50,
      seasons: [SUMMER],
      price: {
        joja: 30,
      },
    });
    const testCrop3 = Crop.for({
      name: "fall crop",
      maturityTimeDays: 13,
      sellPrice: 210,
      seasons: [FALL],
      price: {
        joja: 80,
      },
    });
    const testCrop4 = Crop.for({
      name: "cross-season crop",
      maturityTimeDays: 7,
      sellPrice: 100,
      seasons: [SPRING, SUMMER],
      price: {
        joja: 50,
      },
    });

    const plan = buildPlan(svDate(SPRING, 1), {
      crops: [testCrop1, testCrop2, testCrop3, testCrop4],
      vendors: ALL_VENDORS,
    });

    expect(plan).toMatchObject<PlanEntry[]>([
      {
        crop: testCrop1,
        plantAt: svDate(SPRING, 1),
        harvestAt: svDate(SPRING, 14),
        profit: 130,
        buyFrom: joja,
        regrowCount: 0,
      },
      {
        crop: testCrop1,
        plantAt: svDate(SPRING, 14),
        harvestAt: svDate(SPRING, 27),
        profit: 130,
        buyFrom: joja,
        regrowCount: 0,
      },
      {
        crop: testCrop4,
        plantAt: svDate(SPRING, 27),
        harvestAt: svDate(SUMMER, 6),
        profit: 50,
        buyFrom: joja,
        regrowCount: 0,
      },
      {
        crop: testCrop4,
        plantAt: svDate(SUMMER, 6),
        harvestAt: svDate(SUMMER, 13),
        profit: 50,
        buyFrom: joja,
        regrowCount: 0,
      },
      {
        crop: testCrop4,
        plantAt: svDate(SUMMER, 13),
        harvestAt: svDate(SUMMER, 20),
        profit: 50,
        buyFrom: joja,
        regrowCount: 0,
      },
      {
        crop: testCrop4,
        plantAt: svDate(SUMMER, 20),
        harvestAt: svDate(SUMMER, 27),
        profit: 50,
        buyFrom: joja,
        regrowCount: 0,
      },
      {
        crop: testCrop3,
        plantAt: svDate(FALL, 1),
        harvestAt: svDate(FALL, 14),
        profit: 130,
        buyFrom: joja,
        regrowCount: 0,
      },
      {
        crop: testCrop3,
        plantAt: svDate(FALL, 14),
        harvestAt: svDate(FALL, 27),
        profit: 130,
        buyFrom: joja,
        regrowCount: 0,
      },
    ]);
  });
});

it("should do something amazing with the real crops", () => {
  const result = buildPlan(svDate(SPRING, 1), {
    crops: ALL_CROPS,
    vendors: ALL_VENDORS,
  });
});

it.todo("should be able to get properties of crops");
it.todo("should be able to calculate harvests for regrowing crops");
