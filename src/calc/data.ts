import { SPRING, SUMMER, FALL, WINTER } from "./calendar";
import { Crop, Source } from "./model";

export const crops: Crop[] = [
  {
    name: "Rice Shoot",
    maturityTimeDays: 8, // Account for irrigation; it's only 6 if it's irrigated...
    seasons: [SPRING],
    seedPrice: 40,
    sellPrice: 30,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 10,
      chanceForExtraCrops: 0.1,
    },
    sources: [Source.PIERRE],
  },
  {
    name: "Amaranth Seeds",
    maturityTimeDays: 7,
    seasons: [FALL],
    seedPrice: 70,
    sellPrice: 150,
    sources: [Source.PIERRE, Source.JOJOMART],
  },
  {
    name: "Grape Starter",
    maturityTimeDays: 10,
    seasons: [FALL],
    seedPrice: 60,
    sellPrice: 80,
    sources: [Source.PIERRE, Source.JOJOMART],
  },
  {
    name: "Hops Starter",
    maturityTimeDays: 11,
    seasons: [SUMMER],
    seedPrice: 60,
    sellPrice: 25,
    sources: [Source.PIERRE, Source.JOJOMART],
  },
  {
    name: "Rare Seed",
    maturityTimeDays: 24,
    seasons: [FALL],
    seedPrice: 1000,
    sellPrice: 3000,
    sources: [Source.TRAVELLING_CART],
  },
  {
    name: "Fairy Seeds",
    maturityTimeDays: 12,
    seasons: [FALL],
    seedPrice: 200,
    sellPrice: 290,
    sources: [Source.PIERRE, Source.JOJOMART],
  },
  {
    name: "Tulip Bulb",
    maturityTimeDays: 6,
    seasons: [SPRING],
    seedPrice: 20,
    sellPrice: 30,
    sources: [Source.PIERRE, Source.JOJOMART],
  },
  {
    name: "Jazz Seeds",
    maturityTimeDays: 7,
    seasons: [SPRING],
    seedPrice: 30,
    sellPrice: 50,
    sources: [Source.PIERRE, Source.JOJOMART],
  },
  {
    name: "Sunflower Seeds",
    maturityTimeDays: 8,
    seasons: [SUMMER, FALL],
    seedPrice: 100,
    sellPrice: 80, // Seeds also drop 'between 75% and 90% of the time'; they sell for 20g each, but can be used later on. Seeds have not been included in the 'sellPrice' field.
    sources: [Source.JOJOMART],
  },
  {
    name: "Coffee Bean",
    maturityTimeDays: 10,
    seasons: [SPRING, SUMMER],
    seedPrice: 15,
    sellPrice: 15, // Coffee Beans are their own seed; therefore the value calculated is wrong.
    extraHarvestChance: {
      minHarvest: 4,
      maxHarvest: 4,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.02,
    },
    sources: [Source.TRAVELLING_CART],
  },
  {
    name: "Poppy Seeds",
    maturityTimeDays: 7,
    seasons: [SUMMER],
    seedPrice: 100,
    sellPrice: 140,
    sources: [Source.PIERRE, Source.JOJOMART],
  },
  {
    name: "Spangle Seeds",
    maturityTimeDays: 8,
    seasons: [SUMMER],
    seedPrice: 50,
    sellPrice: 90,
    sources: [Source.PIERRE, Source.JOJOMART],
  },
  {
    name: "Parsnip Seeds",
    maturityTimeDays: 4,
    seasons: [SPRING],
    seedPrice: 20,
    sellPrice: 35,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Bean Starter",
    maturityTimeDays: 10,
    seasons: [SPRING],
    seedPrice: 60,
    sellPrice: 40,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Cauliflower Seeds",
    maturityTimeDays: 12,
    seasons: [SPRING],
    seedPrice: 80,
    sellPrice: 175,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Potato Seeds",
    maturityTimeDays: 6,
    seasons: [SPRING],
    seedPrice: 50,
    sellPrice: 80,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.2,
    },
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Garlic Seeds",
    maturityTimeDays: 4,
    seasons: [SPRING],
    seedPrice: 40,
    sellPrice: 60,
    sources: [Source.PIERRE_YEAR2_PLUS],
  },
  {
    name: "Kale Seeds",
    maturityTimeDays: 6,
    seasons: [SPRING],
    seedPrice: 70,
    sellPrice: 110,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Rhubarb Seeds",
    maturityTimeDays: 13,
    seasons: [SPRING],
    seedPrice: 100,
    sellPrice: 220,
    sources: [Source.OASIS_SHOP],
  },
  {
    name: "Melon Seeds",
    maturityTimeDays: 12,
    seasons: [SUMMER],
    seedPrice: 80,
    sellPrice: 250,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Tomato Seeds",
    maturityTimeDays: 11,
    seasons: [SUMMER],
    seedPrice: 50,
    sellPrice: 60,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.05,
    },
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Blueberry Seeds",
    maturityTimeDays: 13,
    seasons: [SUMMER],
    seedPrice: 80,
    sellPrice: 50,
    extraHarvestChance: {
      minHarvest: 3,
      maxHarvest: 3,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.02,
    },
    sources: [Source.PIERRE],
  },
  {
    name: "Pepper Seeds",
    maturityTimeDays: 5,
    seasons: [SUMMER],
    seedPrice: 40,
    sellPrice: 40,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.03,
    },
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Wheat Seeds",
    maturityTimeDays: 4,
    seasons: [SUMMER, FALL],
    seedPrice: 10,
    sellPrice: 25,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Radish Seeds",
    maturityTimeDays: 6,
    seasons: [SUMMER],
    seedPrice: 40,
    sellPrice: 90,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Red Cabbage Seeds",
    maturityTimeDays: 9,
    seasons: [SUMMER],
    seedPrice: 100,
    sellPrice: 260,
    sources: [Source.PIERRE_YEAR2_PLUS],
  },
  {
    name: "Starfruit Seeds",
    maturityTimeDays: 13,
    seasons: [SUMMER],
    seedPrice: 400,
    sellPrice: 750,
    sources: [Source.PIERRE],
  },
  {
    name: "Corn Seeds",
    maturityTimeDays: 14,
    seasons: [SUMMER, FALL],
    seedPrice: 150,
    sellPrice: 50,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Eggplant Seeds",
    maturityTimeDays: 5,
    seasons: [FALL],
    seedPrice: 20,
    sellPrice: 60,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.002,
    },
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Artichoke Seeds",
    maturityTimeDays: 8,
    seasons: [FALL],
    seedPrice: 30,
    sellPrice: 160,
    sources: [Source.PIERRE_YEAR2_PLUS],
  },
  {
    name: "Pumpkin Seeds",
    maturityTimeDays: 13,
    seasons: [FALL],
    seedPrice: 100,
    sellPrice: 320,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Bok Choy Seeds",
    maturityTimeDays: 4,
    seasons: [FALL],
    seedPrice: 50,
    sellPrice: 80,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Yam Seeds",
    maturityTimeDays: 10,
    seasons: [FALL],
    seedPrice: 60,
    sellPrice: 160,
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Cranberry Seeds",
    maturityTimeDays: 7,
    seasons: [FALL],
    seedPrice: 240,
    sellPrice: 75,
    extraHarvestChance: {
      minHarvest: 2,
      maxHarvest: 2,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.1,
    },
    sources: [Source.JOJOMART, Source.PIERRE],
  },
  {
    name: "Beet Seeds",
    maturityTimeDays: 6,
    seasons: [FALL],
    seedPrice: 20,
    sellPrice: 100,
    sources: [Source.OASIS_SHOP],
  },
  {
    name: "Spring Seeds",
    maturityTimeDays: 7,
    seasons: [SPRING],
    seedPrice: 35,
    sellPrice: 50,
    sources: [Source.CRAFTING_FROM_SKILL],
  },
  {
    name: "Summer Seeds",
    maturityTimeDays: 7,
    seasons: [SUMMER],
    seedPrice: 55,
    sellPrice: 80,
    sources: [Source.CRAFTING_FROM_SKILL],
  },
  {
    name: "Fall Seeds",
    maturityTimeDays: 7,
    seasons: [FALL],
    seedPrice: 45,
    sellPrice: 40,
    sources: [Source.CRAFTING_FROM_SKILL],
  },
  {
    name: "Winter Seeds",
    maturityTimeDays: 7,
    seasons: [WINTER],
    seedPrice: 30,
    sellPrice: 70,
    sources: [Source.CRAFTING_FROM_SKILL],
  },
  {
    name: "Ancient Seeds",
    maturityTimeDays: 28,
    seasons: [SPRING, SUMMER, FALL],
    seedPrice: 30,
    sellPrice: 550,
    sources: [Source.CRAFTING_FROM_SKILL],
  },
  {
    name: "Strawberry Seeds",
    maturityTimeDays: 8,
    seasons: [SPRING],
    seedPrice: 0,
    sellPrice: 120,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.02,
    },
    sources: [Source.FESTIVALS],
  },
  {
    name: "Cactus Seeds",
    maturityTimeDays: 12,
    seasons: [SPRING, SUMMER, FALL, WINTER],
    seedPrice: 0,
    sellPrice: 75,
    sources: [Source.OASIS_SHOP],
  },
  {
    name: "Taro Tuber",
    maturityTimeDays: 10,
    seasons: [SUMMER],
    seedPrice: 20,
    sellPrice: 100,
    sources: [],
  },
  {
    name: "Pineapple Seeds",
    maturityTimeDays: 14,
    seasons: [SUMMER],
    seedPrice: 240,
    sellPrice: 300,
    sources: [],
  },
  {
    name: "Fiber Seeds",
    maturityTimeDays: 7,
    seasons: [SPRING, SUMMER, FALL, WINTER],
    seedPrice: 5,
    sellPrice: 1,
    extraHarvestChance: {
      minHarvest: 4,
      maxHarvest: 7,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.01,
    },
    sources: [],
  },
  {
    name: "Qi Bean",
    maturityTimeDays: 4,
    seasons: [SPRING, SUMMER, FALL, WINTER],
    seedPrice: 1,
    sellPrice: 1,
    sources: [],
  },
];
