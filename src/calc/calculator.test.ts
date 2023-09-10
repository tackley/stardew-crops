import { test, it, expect } from "vitest";
import { profitPerDay } from "./calculator";
import { Crop } from "./model";

it("should calculate basic profit per day", () => {
  const testCrop: Crop = {
    name: "test crop",
    seedPrice: 10,
    maturityTimeDays: 1,
    sellPrice: 20,
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
