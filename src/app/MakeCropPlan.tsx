import { PlanEntry, buildPlan } from "@/calc/calculator";
import { StardewDate } from "@/calc/calendar";
import { Crop } from "@/calc/model";
import { useMemo } from "react";

export interface CropPlanParams {
  date: StardewDate;
  crops: Crop[];
}

interface Props {
  params: CropPlanParams;
}

export function MakeCropPlan({ params }: Props) {
  const plan = useMemo(() => buildPlan(params.crops, params.date), [params]);
  return (
    <div>
      <table className="">
        <thead className="font-bold">
          <tr>
            <td>Crop</td>
            <td>Plant At</td>
            <td>Harvest At</td>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {plan.map((planEntry) => (
            <tr key={planEntry.plantAt.dayOfYear} className="">
              <td className="p-1">{planEntry.crop.name}</td>
              <td className="p-1">{planEntry.plantAt.toString()}</td>
              <td className="p-1">{planEntry.harvestAt.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
