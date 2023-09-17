import { AllSeasons, SPRING, StardewDate } from "@/calc/calendar";
import _ from "lodash";
import { Dispatch } from "react";

interface Props {
  date: StardewDate;
  onChange: Dispatch<StardewDate>;
}

const DAYS = _.range(1, 28);

export function SelectDate({ date, onChange }: Props) {
  return (
    <div className="flex items-center">
      <span className="font-semibold">Day</span>
      <select
        onChange={(e) => {
          const selectedSeason = AllSeasons[Number(e.target.value)];
          onChange(new StardewDate(selectedSeason, date.dayOfMonth));
        }}
        value={date.season.idx}
        className="py-1 text-xs ml-1"
      >
        {AllSeasons.map((s) => {
          return (
            <option key={s.idx} value={s.idx}>
              {s.name}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => {
          const selectedDay = Number(e.target.value);
          onChange(new StardewDate(date.season, selectedDay));
        }}
        value={date.dayOfMonth}
        className="py-1 text-xs"
      >
        {DAYS.map((d) => {
          return (
            <option key={d} value={d}>
              {d}
            </option>
          );
        })}
      </select>
    </div>
  );
}
