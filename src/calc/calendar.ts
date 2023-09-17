import assert from "assert";

export interface Season {
  name: string;
  offsetDays: number;
  idx: number;
}
export const SPRING: Season = { name: "Spring", offsetDays: 0, idx: 0 };
export const SUMMER: Season = { name: "Summer", offsetDays: 28, idx: 1 };
export const FALL: Season = { name: "Fall", offsetDays: 56, idx: 2 };
export const AUTUMN = FALL;
export const WINTER: Season = { name: "Winter", offsetDays: 84, idx: 3 };

export const AllSeasons = [SPRING, SUMMER, FALL, WINTER];

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
    const newSeasonIdx = Math.floor((newDayOfYear - 1) / 28);
    const newSeason = AllSeasons.find((s) => s.idx === newSeasonIdx);

    if (!newSeason) return undefined;

    const newDayOfMonth = newDayOfYear - newSeason.offsetDays;

    return new StardewDate(newSeason, newDayOfMonth);
  }
  nextSeason(): StardewDate | undefined {
    const newSeasonIdx = this.season.idx + 1;
    const newSeason = AllSeasons.find((s) => s.idx === newSeasonIdx);
    if (!newSeason) return undefined;
    return svDate(newSeason, 1);
  }

  toString(): string {
    return `${this.season.name} ${this.dayOfMonth}`;
  }

  toJSON(): any {
    return this.toString();
  }

  valueOf(): string {
    return this.toString();
  }
}

export function svDate(season: Season, day: number): StardewDate {
  return new StardewDate(season, day);
}
