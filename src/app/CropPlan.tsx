import { PlanVariables, buildPlan } from "@/calc/calculator";
import { StardewDate } from "@/calc/calendar";
import { useMemo } from "react";
import * as R from "remeda";

export interface CropPlanParams {
  date: StardewDate;
  variables: PlanVariables;
}

export function CropPlan(params: CropPlanParams) {
  const plan = useMemo(
    () => buildPlan(params.date, params.variables),
    [params]
  );
  return (
    <div>
      <table className="">
        <thead className="font-bold">
          <tr>
            <td>Crop</td>
            <td>Buy From</td>
            <td>Plant At</td>
            <td>Regrow</td>
            <td>Harvest At</td>
            <td className="text-right">Profit</td>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {plan.map((planEntry) => (
            <tr key={planEntry.plantAt.dayOfYear} className="">
              <td className="p-1">{planEntry.crop.name}</td>
              <td className="p-1">{planEntry.buyFrom.name}</td>
              <td className="p-1">{planEntry.plantAt.toString()}</td>
              <td className="p-1">{planEntry.regrowCount}</td>
              <td className="p-1">{planEntry.harvestAt.toString()}</td>
              <td className="p-1 text-right">
                {planEntry.profit.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={4}></td>
            <td className="p-1 text-right font-bold">
              {R.sumBy(plan, (p) => p.profit).toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
