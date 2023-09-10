import { buildPlan } from "./calc/calculator";
import { svDate, SPRING } from "./calc/calendar";
import { crops } from "./calc/data";

// run with:
//  pnpx vite-node src/cli.ts

console.log("starting!");

const result = buildPlan(crops, svDate(SPRING, 1));

console.log("\n\n** THE RESULTS ARE IN ** \n");
result.forEach((p) => {
  console.log(
    `${p.plantAt} ${p.crop.name} (harvest ${p.harvestAt} for ${p.profit} profit)`
  );
});
