import { expect, it } from "vitest";
import { Seasons, StardewDate } from "./calendar";

it("should render a date correctly", () => {
  expect(new StardewDate(Seasons.SPRING, 1).toString()).toBe("Spring 1");
  expect(new StardewDate(Seasons.SPRING, 2).toString()).toBe("Spring 2");
  expect(new StardewDate(Seasons.SPRING, 28).toString()).toBe("Spring 28");
  expect(new StardewDate(Seasons.WINTER, 1).toString()).toBe("Winter 1");
});

it("should reject invalid dates", () => {
  expect(() => new StardewDate(Seasons.SPRING, 44)).toThrowError();
  expect(() => new StardewDate(Seasons.SPRING, -1)).toThrowError();
});

it("should be able to add days to date", () => {
  expect(new StardewDate(Seasons.SPRING, 1).addDays(0)?.toString()).toBe(
    "Spring 1"
  );

  expect(new StardewDate(Seasons.SPRING, 1).addDays(1)?.toString()).toBe(
    "Spring 2"
  );

  expect(new StardewDate(Seasons.SPRING, 1).addDays(3)?.toString()).toBe(
    "Spring 4"
  );

  expect(new StardewDate(Seasons.SPRING, 1).addDays(28)?.toString()).toBe(
    "Summer 1"
  );
});

it("should return undefined if a date addition goes beyond the end of time (i.e. year)", () => {
  expect(new StardewDate(Seasons.WINTER, 28).addDays(1)).toBeUndefined();
  expect(new StardewDate(Seasons.SPRING, 1).addDays(289)).toBeUndefined();
});
