import { Source } from "@/calc/model";
import { Dispatch } from "react";

type SelectedSources = Source[];

const availableSources = [
  {
    source: Source.PIERRE,
    name: "General Store",
  },
  {
    source: Source.PIERRE_YEAR2_PLUS,
    name: "General Store (Yr2+)",
  },
  {
    source: Source.JOJAMART,
    name: "JojaMart",
  },
  {
    source: Source.OASIS_SHOP,
    name: "Oasis Shop",
  },
  {
    source: Source.EGG_FESTIVAL,
    name: "Egg Festival",
  },
  {
    source: Source.TRAVELLING_CART,
    name: "Travelling Cart",
  },
];

/*
  PIERRE,
  PIERRE_YEAR2_PLUS,
  JOJAMART,
  OASIS_SHOP,
  FESTIVALS,
  TRAVELLING_CART
*/

interface Props {
  sources: SelectedSources;
  onChange: Dispatch<SelectedSources>;
}

export function SelectSources({ sources, onChange }: Props) {
  function toggleSource(source: Source) {
    if (sources.includes(source)) {
      onChange(sources.filter((s) => s !== source));
    } else {
      onChange([...sources, source]);
    }
  }
  return (
    <div className="flex items-center flex-wrap">
      <span className="font-semibold">Sources</span>
      {availableSources.map((s) => (
        <label key={s.source} className="px-1 flex items-center">
          <input
            key="src"
            type="checkbox"
            checked={sources.includes(s.source)}
            onClick={() => toggleSource(s.source)}
          />
          <span className="pl-0.5 text-xs">{s.name}</span>
        </label>
      ))}
    </div>
  );
}
