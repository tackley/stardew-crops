import { PlanEntry, PlanVariables, buildPlan } from "@/calc/calculator";
import { StardewDate } from "@/calc/calendar";
import { useMemo } from "react";
import * as R from "remeda";

export interface CropPlanParams {
  date: StardewDate;
  variables: PlanVariables;
}

function formatHarvestAt(p: PlanEntry): string {
  if (p.regrowCount > 0) {
    return `${p.harvestAt} (x${p.regrowCount + 1})`;
  }

  return `${p.harvestAt}`;
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
            <td className="p-2" width={200}>
              Crop
            </td>
            <td className="p-2" width={175}>
              Buy From
            </td>
            <td className="p-2" width={120}>
              Plant At
            </td>
            <td className="p-2" width={150}>
              Harvest
            </td>
            <td className="p-2 text-right" width={60}>
              Profit
            </td>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {plan
            .filter((entry) => entry.profit > 0)
            .map((planEntry) => (
              <tr key={planEntry.plantAt.dayOfYear} className="">
                <td className="p-2">{planEntry.crop.name}</td>
                <td className="p-2">{planEntry.buyFrom.name}</td>
                <td className="p-2">{planEntry.plantAt.toString()}</td>
                <td className="p-2">{formatHarvestAt(planEntry)}</td>
                <td className="p-2 text-right">
                  {planEntry.profit.toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={4}></td>
            <td className="p-2 text-right font-bold">
              {R.sumBy(plan, (p) => p.profit).toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
