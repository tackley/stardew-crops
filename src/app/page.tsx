"use client";
import { SPRING, StardewDate } from "@/calc/calendar";
import { Dispatch, useState } from "react";
import { CropPlan } from "./CropPlan";
import { SelectDate } from "./SelectDate";
import { SelectVendors } from "./SelectSources";
import { ALL_CROPS, Crop } from "@/calc/crop";
import { Vendor, Vendors } from "@/calc/model";

interface Selections {
  date: StardewDate;
  vendors: Vendor[];
}

export default function Home() {
  const [selections, setSelections] = useState<Selections>({
    date: new StardewDate(SPRING, 1),
    vendors: [Vendors.pierre, Vendors.joja],
  });

  const onDateChange: Dispatch<StardewDate> = (newDate) =>
    setSelections((old) => ({
      ...old,
      date: newDate,
    }));

  const onVendorsChange: Dispatch<Vendor[]> = (newVendors) =>
    setSelections((old) => ({ ...old, vendors: newVendors }));

  return (
    <main className="min-h-screen p-2 container mx-auto my-4">
      <h1 className="text-3xl font-bold">
        Stardew Valley Semi-OK Crop Calculator
      </h1>

      <div className="flex flex-row gap-2 mt-2">
        <SelectDate date={selections.date} onChange={onDateChange} />

        <SelectVendors
          vendors={selections.vendors}
          onChange={onVendorsChange}
        />
      </div>

      <div className="mt-4">
        <CropPlan
          date={selections.date}
          variables={{ crops: ALL_CROPS, vendors: selections.vendors }}
        />
      </div>
    </main>
  );
}
