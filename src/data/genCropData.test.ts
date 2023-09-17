import { expect, it } from "vitest";
import crops from "./Crops.json";
import objInfo from "./ObjectInformation.json";
import fs from "node:fs";
import * as R from "remeda";

function parseObjInfoLine(entry: string) {
  const [name, priceString] = entry.split("/");

  return {
    name,
    price: Number(priceString),
  };
}

const objectInfos: Record<string, { name: string; price: number }> =
  R.mapValues(objInfo, parseObjInfoLine);

function parseCropLine(id: keyof typeof objectInfos, entry: string) {
  const [growth, season, _idx, outputItem, _a, _b, extraChance] =
    entry.split("/");

  const seedObjectInfo = objectInfos[id];
  const grownObjectInfo = objectInfos[outputItem];

  const growthtime = R.sumBy(growth.split(" "), (v) => Number(v));
  const seasonString = season.split(" ").map((s) => s.toUpperCase());

  let extraHarvestChance;
  const chances = extraChance.split(" ");
  if (chances[0] === "true") {
    extraHarvestChance = {
      minHarvest: Number(chances[1]),
      maxHarvest: Number(chances[2]),
      maxHarvestIncreasePerFarmingLevel: Number(chances[3]),
      chanceForExtraCrops: Number(chances[4]),
    };
  }

  return {
    name: seedObjectInfo.name,
    maturityTimeDays: growthtime,
    seasons: seasonString as any,
    seedPrice: seedObjectInfo.price,
    sellPrice: grownObjectInfo.price,
    extraHarvestChance,
  };
}

it("should be possible to parse a crop entry", () => {
  const entry = "1 2 2 3/spring/34/271/-1/1/true 1 1 10 .1/false/false";
  const parsed = parseCropLine("273", entry);
  expect(parsed).toMatchObject({
    extraHarvestChance: {
      chanceForExtraCrops: 0.1,
      maxHarvest: 1,
      maxHarvestIncreasePerFarmingLevel: 10,
      minHarvest: 1,
    },
    maturityTimeDays: 8,
    name: "Rice Shoot",
    seasons: ["SPRING"],
    seedPrice: 20,
    sellPrice: 30,
  });
});

it("should work", () => {
  const result = Object.entries(crops).map(([k, v]) => {
    return parseCropLine(k, v);
  });

  fs.writeFileSync(__dirname + "/output.json", JSON.stringify(result, null, 2));
});
