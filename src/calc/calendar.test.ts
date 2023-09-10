import { expect, it } from "vitest";
import {
  AUTUMN,
  SPRING,
  SUMMER,
  StardewDate,
  WINTER,
  svDate,
} from "./calendar";

it("should render a date correctly", () => {
  expect(svDate(SPRING, 1).toString()).toBe("Spring 1");
  expect(svDate(SPRING, 2).toString()).toBe("Spring 2");
  expect(svDate(SPRING, 28).toString()).toBe("Spring 28");
  expect(svDate(WINTER, 1).toString()).toBe("Winter 1");
});

it("should reject invalid dates", () => {
  expect(() => svDate(SPRING, 44)).toThrowError();
  expect(() => svDate(SPRING, -1)).toThrowError();
});

it("should be able to add days to date", () => {
  expect(svDate(SPRING, 1).addDays(0)?.toString()).toBe("Spring 1");

  expect(svDate(SPRING, 1).addDays(1)?.toString()).toBe("Spring 2");

  expect(svDate(SPRING, 1).addDays(3)?.toString()).toBe("Spring 4");

  expect(svDate(SPRING, 1).addDays(28)?.toString()).toBe("Summer 1");
});

it("should return undefined if a date addition goes beyond the end of time (i.e. year)", () => {
  expect(svDate(WINTER, 28).addDays(1)).toBeUndefined();
  expect(svDate(SPRING, 1).addDays(289)).toBeUndefined();
});

it("should not be silly with days of 28", () => {
  expect(svDate(SUMMER, 27).addDays(1)?.toString()).toBe("Summer 28");
});

it("should be able to skip to next season", () => {
  expect(svDate(SPRING, 1).nextSeason()?.toString()).toBe("Summer 1");
  expect(svDate(SPRING, 11).nextSeason()?.toString()).toBe("Summer 1");
  expect(svDate(SUMMER, 1).nextSeason()?.toString()).toBe("Fall 1");
  expect(svDate(AUTUMN, 2).nextSeason()?.toString()).toBe("Winter 1");
  expect(svDate(WINTER, 1).nextSeason()?.toString()).toBeUndefined();
});
