import assert from "node:assert";

interface Season {
  name: string;
  offsetDays: number;
}
export const Seasons = {
  SPRING: { name: "Spring", offsetDays: 0, idx: 0 },
  SUMMER: { name: "Summer", offsetDays: 28, idx: 1 },
  FALL: { name: "Fall", offsetDays: 56, idx: 2 },
  WINTER: { name: "Winter", offsetDays: 84, idx: 3 },
} as const;

const AllSeasons = [
  Seasons.SPRING,
  Seasons.SUMMER,
  Seasons.FALL,
  Seasons.WINTER,
];

export class StardewDate {
  public readonly dayOfYear: number;

  constructor(
    public readonly season: Season,
    public readonly dayOfMonth: number
  ) {
    assert(dayOfMonth >= 1);
    assert(dayOfMonth <= 28);

    this.dayOfYear = season.offsetDays + dayOfMonth;
  }

  addDays(d: number): StardewDate | undefined {
    const newDayOfYear = this.dayOfYear + d;
    const newSeasonIdx = Math.floor(newDayOfYear / 28);
    const newSeason = AllSeasons.find((s) => s.idx === newSeasonIdx);

    if (!newSeason) return undefined;

    const newDayOfMonth = newDayOfYear - newSeason.offsetDays;

    return new StardewDate(newSeason, newDayOfMonth);
  }

  toString(): string {
    return `${this.season.name} ${this.dayOfMonth}`;
  }
}

/*
type StardewDate = {
  season: Season;
  day: number ;
};

export function renderDate(dt: StardewDate): string {
  return `${dt.season} ${dt.day}`;
}

export function addDays(
  dt: StardewDate,
  days: number
): StardewDate | undefined {
  assert(days >= 0);

  const newDate = {
    ..dt,
    day: dt.day + 
  }
  return dt;
}
*/
