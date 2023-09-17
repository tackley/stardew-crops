import { SPRING, SUMMER, FALL, WINTER } from "./calendar";
import { Crop, Source } from "./model";

export const crops: Crop[] = [
  {
    name: "Rice Shoot",
    maturityTimeDays: 8, // Account for irrigation; it's only 6 if it's irrigated...
    regrowTimeDays: -1,
    seasons: [SPRING],
    seedPrice: 40,
    sellPrice: 30,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 10,
      chanceForExtraCrops: 0.1,
    },
    sources: [Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 40,
      travellingCart: 450,
    }
  },
  {
    name: "Amaranth Seeds",
    maturityTimeDays: 7,
    regrowTimeDays: -1,
    seasons: [FALL],
    seedPrice: 70,
    sellPrice: 150,
    sources: [Source.PIERRE, Source.JOJAMART, Source.TRAVELLING_CART],
    price: {
      pierres: 70,
      jojaMart: 87,
      travellingCart: 602.5,
    }
  },
  {
    name: "Grape Starter",
    maturityTimeDays: 10,
    regrowTimeDays: 3,
    seasons: [FALL],
    seedPrice: 60,
    sellPrice: 80,
    sources: [Source.PIERRE, Source.JOJAMART, Source.TRAVELLING_CART],
    price: {
      pierres: 60,
      jojaMart: 75,
      travellingCart: 600,
    }
  },
  {
    name: "Hops Starter",
    maturityTimeDays: 11,
    regrowTimeDays: 1,
    seasons: [SUMMER],
    seedPrice: 60,
    sellPrice: 25,
    sources: [Source.PIERRE, Source.JOJAMART, Source.TRAVELLING_CART],
    price: {
      pierres: 60,
      jojaMart: 75,
      travellingCart: 600
    }
  },
  {
    name: "Rare Seed",
    maturityTimeDays: 24,
    regrowTimeDays: -1,
    seasons: [FALL],
    seedPrice: 1000,
    sellPrice: 3000,
    sources: [Source.TRAVELLING_CART],
    price: {
      travellingCart: 1000
    }
  },
  {
    name: "Fairy Seeds",
    maturityTimeDays: 12,
    regrowTimeDays: -1,
    seasons: [FALL],
    seedPrice: 200,
    sellPrice: 290,
    sources: [Source.PIERRE, Source.JOJAMART, Source.TRAVELLING_CART],
    price: {
      pierres: 200,
      jojaMart: 250,
      travellingCart: 650,
    }
  },
  {
    name: "Tulip Bulb",
    maturityTimeDays: 6,
    regrowTimeDays: -1,
    seasons: [SPRING],
    seedPrice: 20,
    sellPrice: 30,
    sources: [Source.PIERRE, Source.JOJAMART, Source.TRAVELLING_CART],
    price: {
      pierres: 20,
      jojaMart: 25,
      travellingCart: 550,
    }
  },
  {
    name: "Jazz Seeds",
    maturityTimeDays: 7,
    regrowTimeDays: -1,
    seasons: [SPRING],
    seedPrice: 30,
    sellPrice: 50,
    sources: [Source.PIERRE, Source.JOJAMART, Source.TRAVELLING_CART],
    price: {
      pierres: 30,
      jojaMart: 37,
      travellingCart: 600,
    }
  },
  {
    name: "Sunflower Seeds",
    maturityTimeDays: 8,
    regrowTimeDays: -1,
    seasons: [SUMMER, FALL],
    seedPrice: 100,
    sellPrice: 80, // Seeds also drop 'between 75% and 90% of the time'; they sell for 20g each, but can be used later on. Seeds have not been included in the 'sellPrice' field.
    sources: [Source.PIERRE, Source.JOJAMART, Source.TRAVELLING_CART],
    price: {
      pierres: 200,
      jojaMart: 125,
      travellingCart: 550
    }
  },
  {
    name: "Coffee Bean",
    maturityTimeDays: 10,
    regrowTimeDays: 2,
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
    price: {
      travellingCart: 550
    }
  },
  {
    name: "Poppy Seeds",
    maturityTimeDays: 7,
    regrowTimeDays: -1,
    seasons: [SUMMER],
    seedPrice: 100,
    sellPrice: 140,
    sources: [Source.PIERRE, Source.JOJAMART, Source.TRAVELLING_CART],
    price: {
      pierres: 100,
      jojaMart: 125,
      travellingCart: 575,
    }
  },
  {
    name: "Spangle Seeds",
    maturityTimeDays: 8,
    regrowTimeDays: -1,
    seasons: [SUMMER],
    seedPrice: 50,
    sellPrice: 90,
    sources: [Source.PIERRE, Source.JOJAMART, Source.TRAVELLING_CART],
    price: {
      pierres: 50,
      jojaMart: 62,
      travellingCart: 550,
    }
  },
  {
    name: "Parsnip Seeds",
    maturityTimeDays: 4,
    regrowTimeDays: -1,
    seasons: [SPRING],
    seedPrice: 20,
    sellPrice: 35,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 20,
      jojaMart: 25,
      travellingCart: 550,
    }
  },
  {
    name: "Bean Starter",
    maturityTimeDays: 10,
    regrowTimeDays: 3,
    seasons: [SPRING],
    seedPrice: 60,
    sellPrice: 40,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 60,
      jojaMart: 75,
      travellingCart: 550,
    }
  },
  {
    name: "Cauliflower Seeds",
    maturityTimeDays: 12,
    regrowTimeDays: -1,
    seasons: [SPRING],
    seedPrice: 80,
    sellPrice: 175,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 80,
      jojaMart: 100,
      travellingCart: 560,
    }
  },
  {
    name: "Potato Seeds",
    maturityTimeDays: 6,
    regrowTimeDays: -1,
    seasons: [SPRING],
    seedPrice: 50,
    sellPrice: 80,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.2,
    },
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 50,
      jojaMart: 62,
      travellingCart: 550,
    }
  },
  {
    name: "Garlic Seeds",
    maturityTimeDays: 4,
    regrowTimeDays: -1,
    seasons: [SPRING],
    seedPrice: 40,
    sellPrice: 60,
    sources: [Source.PIERRE_YEAR2_PLUS, Source.TRAVELLING_CART],
    price: {
      pierres: 40,
      travellingCart: 550
    }
  },
  {
    name: "Kale Seeds",
    maturityTimeDays: 6,
    regrowTimeDays: -1,
    seasons: [SPRING],
    seedPrice: 70,
    sellPrice: 110,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 70,
      jojaMart: 87,
      travellingCart: 502.5,
    }
  },
  {
    name: "Rhubarb Seeds",
    maturityTimeDays: 13,
    regrowTimeDays: -1,
    seasons: [SPRING],
    seedPrice: 100,
    sellPrice: 220,
    sources: [Source.OASIS_SHOP, Source.TRAVELLING_CART],
    price: {
      oasisShop: 100,
      travellingCart: 575
    }
  },
  {
    name: "Melon Seeds",
    maturityTimeDays: 12,
    regrowTimeDays: -1,
    seasons: [SUMMER],
    seedPrice: 80,
    sellPrice: 250,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 80,
      jojaMart: 100,
      travellingCart: 560,
    }
  },
  {
    name: "Tomato Seeds",
    maturityTimeDays: 11,
    regrowTimeDays: 4,
    seasons: [SUMMER],
    seedPrice: 50,
    sellPrice: 60,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.05,
    },
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 50,
      jojaMart: 62,
      travellingCart: 550,
    }
  },
  {
    name: "Blueberry Seeds",
    maturityTimeDays: 13,
    regrowTimeDays: 4,
    seasons: [SUMMER],
    seedPrice: 80,
    sellPrice: 50,
    extraHarvestChance: {
      minHarvest: 3,
      maxHarvest: 3,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.02,
    },
    sources: [Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 80,
      travellingCart: 560
    }
  },
  {
    name: "Pepper Seeds",
    maturityTimeDays: 5,
    regrowTimeDays: 3,
    seasons: [SUMMER],
    seedPrice: 40,
    sellPrice: 40,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.03,
    },
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 40,
      jojaMart: 50,
      travellingCart: 550
    }
  },
  {
    name: "Wheat Seeds",
    maturityTimeDays: 4,
    regrowTimeDays: -1,
    seasons: [SUMMER, FALL],
    seedPrice: 10,
    sellPrice: 25,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 10,
      jojaMart: 12,
      travellingCart: 550
    }
  },
  {
    name: "Radish Seeds",
    maturityTimeDays: 6,
    regrowTimeDays: -1,
    seasons: [SUMMER],
    seedPrice: 40,
    sellPrice: 90,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 40,
      jojaMart: 50,
      travellingCart: 550
    }
  },
  {
    name: "Red Cabbage Seeds",
    maturityTimeDays: 9,
    regrowTimeDays: -1,
    seasons: [SUMMER],
    seedPrice: 100,
    sellPrice: 260,
    sources: [Source.PIERRE_YEAR2_PLUS, Source.TRAVELLING_CART],
    price: {
      pierres: 100,
      travellingCart: 575
    }
  },
  {
    name: "Starfruit Seeds",
    maturityTimeDays: 13,
    regrowTimeDays: -1,
    seasons: [SUMMER],
    seedPrice: 400,
    sellPrice: 750,
    sources: [Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      oasisShop: 400,
      travellingCart: 800
    }
  },
  {
    name: "Corn Seeds",
    maturityTimeDays: 14,
    regrowTimeDays: 4,
    seasons: [SUMMER, FALL],
    seedPrice: 150,
    sellPrice: 50,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 150,
      jojaMart: 187,
      travellingCart: 612.5
    }
  },
  {
    name: "Eggplant Seeds",
    maturityTimeDays: 5,
    regrowTimeDays: -5,
    seasons: [FALL],
    seedPrice: 20,
    sellPrice: 60,
    extraHarvestChance: {
      minHarvest: 1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.002,
    },
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 20,
      jojaMart: 25,
      travellingCart: 550
    }
  },
  {
    name: "Artichoke Seeds",
    maturityTimeDays: 8,
    regrowTimeDays: -1,
    seasons: [FALL],
    seedPrice: 30,
    sellPrice: 160,
    sources: [Source.PIERRE_YEAR2_PLUS, Source.TRAVELLING_CART],
    price: {
      pierres: 30,
      travellingCart: 550
    }
  },
  {
    name: "Pumpkin Seeds",
    maturityTimeDays: 13,
    regrowTimeDays: -1,
    seasons: [FALL],
    seedPrice: 100,
    sellPrice: 320,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 100,
      jojaMart: 125,
      travellingCart: 575
    }
  },
  {
    name: "Bok Choy Seeds",
    maturityTimeDays: 4,
    regrowTimeDays: -1,
    seasons: [FALL],
    seedPrice: 50,
    sellPrice: 80,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 50,
      jojaMart: 62,
      travellingCart: 550
    }
  },
  {
    name: "Yam Seeds",
    maturityTimeDays: 10,
    regrowTimeDays: -1,
    seasons: [FALL],
    seedPrice: 60,
    sellPrice: 160,
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 60,
      jojaMart: 75,
      travellingCart: 550
    }
  },
  {
    name: "Cranberry Seeds",
    maturityTimeDays: 7,
    regrowTimeDays: 5,
    seasons: [FALL],
    seedPrice: 240,
    sellPrice: 75,
    extraHarvestChance: {
      minHarvest: 2,
      maxHarvest: 2,
      maxHarvestIncreasePerFarmingLevel: 0,
      chanceForExtraCrops: 0.1,
    },
    sources: [Source.JOJAMART, Source.PIERRE, Source.TRAVELLING_CART],
    price: {
      pierres: 240,
      jojaMart: 300,
      travellingCart: 590
    }
  },
  {
    name: "Beet Seeds",
    maturityTimeDays: 6,
    regrowTimeDays: -1,
    seasons: [FALL],
    seedPrice: 20,
    sellPrice: 100,
    sources: [Source.OASIS_SHOP, Source.TRAVELLING_CART],
    price: {
      oasisShop: 20,
      travellingCart: 550
    }
  },
  {
    name: "Strawberry Seeds",
    maturityTimeDays: 8,
    regrowTimeDays: 4,
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
    price: {
      festivals: 100
    }
  },
  {
    name: "Cactus Seeds",
    maturityTimeDays: 12,
    regrowTimeDays: 3,
    seasons: [],
    seedPrice: 0,
    sellPrice: 75,
    sources: [Source.OASIS_SHOP],
    price: {
      oasisShop: 150
    }
  },
];
