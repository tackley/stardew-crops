"use client";
import { SPRING, StardewDate } from "@/calc/calendar";
import { useState } from "react";
import { CropPlanParams, CropPlan } from "./CropPlan";
import { crops } from "@/calc/data";
import { Source } from "@/calc/model";

export default function Home() {
  const [params, setParams] = useState<CropPlanParams>({
    date: new StardewDate(SPRING, 1),
    crops: crops.filter((c) => c.sources.includes(Source.JOJOMART)),
  });

  return (
    <main className="min-h-screen p-2 container mx-auto my-4">
      <h1 className="text-3xl font-bold">
        Stardew Valley Best Crop Calculator
      </h1>

      {/* select:
        <ul className="list-disc">
          <li>source of crops (pierres, master jojo, oasis shop etc etc)</li>
          <li>current date</li>
          <li></li>
        </ul> */}

      <div className="flex flex-row gap-2">
        <div>Date: {params.date.toString()}</div>

        <div className="bg-slate-200">TODO: Select sources</div>
      </div>

      <div className="mt-4">
        <CropPlan params={params} />
      </div>
    </main>
  );
}
