"use client";
import { SPRING, StardewDate } from "@/calc/calendar";
import { Dispatch, useState } from "react";
import { CropPlanParams, CropPlan } from "./CropPlan";
import { crops } from "@/calc/data";
import { Crop, Source } from "@/calc/model";
import { SelectDate } from "./SelectDate";
import { SelectSources } from "./SelectSources";
import _ from "lodash";

interface Selections {
  date: StardewDate;
  sources: Source[];
}

function cropsForSources(sources: Source[]): Crop[] {
  return _.sortBy(
    crops.filter((c) => c.sources.some((src) => sources.includes(src))),
    "name"
  );
}

export default function Home() {
  const [selections, setSelections] = useState<Selections>({
    date: new StardewDate(SPRING, 1),
    sources: [Source.JOJAMART],
  });

  const onDateChange: Dispatch<StardewDate> = (newDate) =>
    setSelections((old) => ({
      ...old,
      date: newDate,
    }));

  const onSourceChange: Dispatch<Source[]> = (newSources) =>
    setSelections((old) => ({ ...old, sources: newSources }));

  const selectedCrops = cropsForSources(selections.sources);

  return (
    <main className="min-h-screen p-2 container mx-auto my-4">
      <h1 className="text-3xl font-bold">
        Stardew Valley Best Crop Calculator
      </h1>

      <div className="flex flex-row gap-2 mt-2">
        <SelectDate date={selections.date} onChange={onDateChange} />

        <SelectSources sources={selections.sources} onChange={onSourceChange} />
      </div>
      <div className="mt-4">
        debug: available crops ={" "}
        {selectedCrops.map((c) => (
          <span className=" bg-fuchsia-50 mr-1 px-1 rounded-md" key={c.name}>
            <span className="whitespace-nowrap">{c.name}</span>{" "}
          </span>
        ))}
      </div>

      <div className="mt-4">
        <CropPlan crops={selectedCrops} date={selections.date} />
      </div>
    </main>
  );
}
