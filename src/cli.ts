import { buildPlan } from "./calc/calculator";
import { svDate, SPRING } from "./calc/calendar";
import { ALL_CROPS } from "./calc/crop";
import { ALL_VENDORS } from "./calc/model";

// run with:
//  pnpx vite-node src/cli.ts

console.log("starting!");

const result = buildPlan(svDate(SPRING, 1), {
  crops: ALL_CROPS,
  vendors: ALL_VENDORS,
});

console.log("\n\n** THE RESULTS ARE IN ** \n");
result.forEach((p) => {
  console.log(
    `${p.plantAt} ${p.crop.name} (harvest ${p.harvestAt} for ${p.profit} profit)`
  );
});
