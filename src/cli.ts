import { buildPlan } from "./calc/calculator";
import { svDate, SPRING } from "./calc/calendar";
import { crops } from "./calc/data";
import { Source } from "./calc/model";

// run with:
//  pnpx vite-node src/cli.ts

console.log("starting!");

const basicCrops = crops.filter((c) => c.sources.includes(Source.JOJOMART));
const result = buildPlan(basicCrops, svDate(SPRING, 1));

console.log("\n\n** THE RESULTS ARE IN ** \n");
result.forEach((p) => {
  console.log(
    `${p.plantAt} ${p.crop.name} (harvest ${p.harvestAt} for ${p.profit} profit)`
  );
});
