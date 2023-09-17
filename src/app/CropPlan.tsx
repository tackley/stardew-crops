import { buildPlan } from "@/calc/calculator";
import { StardewDate } from "@/calc/calendar";
import { Crop } from "@/calc/model";
import _ from "lodash";
import { useMemo } from "react";

export interface CropPlanParams {
  date: StardewDate;
  crops: Crop[];
}

export function CropPlan(params: CropPlanParams) {
  const plan = useMemo(() => buildPlan(params.crops, params.date), [params]);
  return (
    <div>
      <table className="">
        <thead className="font-bold">
          <tr>
            <td>Crop</td>
            <td>Plant At</td>
            <td>Harvest At</td>
            <td className="text-right">Profit</td>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {plan.map((planEntry) => (
            <tr key={planEntry.plantAt.dayOfYear} className="">
              <td className="p-1">{planEntry.crop.name}</td>
              <td className="p-1">{planEntry.plantAt.toString()}</td>
              <td className="p-1">{planEntry.harvestAt.toString()}</td>
              <td className="p-1 text-right">
                {planEntry.profit.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={3}></td>
            <td className="p-1 text-right font-bold">
              {_.sumBy(plan, "profit").toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
