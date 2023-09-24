import { Vendor, Vendors, pierre, pierreYear2 } from "@/calc/model";
import { Dispatch, useState } from "react";
import * as R from "remeda";
import { SelectionCaption } from "./SelectionCaption";

type SelectedVendors = Vendor[];

interface Props {
  vendors: SelectedVendors;
  onChange: Dispatch<SelectedVendors>;
}

const VendorsExceptYearSpecific = R.omit(Vendors, ["pierreYear2"]);

export function SelectVendors({ vendors, onChange }: Props) {
  const [year, setYear] = useState<1 | 2>(1);

  function toggleVendor(v: Vendor) {
    const toToggle = v === pierre && year === 2 ? [pierre, pierreYear2] : [v];

    if (vendors.includes(v)) {
      onChange(R.reject(vendors, (value) => toToggle.includes(value)));
    } else {
      onChange([...vendors, ...toToggle]);
    }
  }

  function updateYear(year: string) {
    if (year === "1") {
      setYear(1);
      onChange(R.reject(vendors, R.equals(pierreYear2)));
    } else {
      setYear(2);
      if (vendors.includes(pierre)) {
        onChange([...vendors, pierreYear2]);
      }
    }
  }

  return (
    <>
      <div className="flex items-center flex-wrap">
        <SelectionCaption>Year</SelectionCaption>

        <select
          value={year}
          onChange={(e) => updateYear(e.target.value)}
          className="ml-1 py-1 text-xs"
        >
          <option value={1}>1</option>
          <option value={2}>2+</option>
        </select>
      </div>
      <div className="flex items-center flex-wrap">
        <SelectionCaption>Sources</SelectionCaption>
        {R.toPairs(VendorsExceptYearSpecific).map(([id, vendor]) => (
          <label key={id} className="px-1 flex items-center">
            <input
              type="checkbox"
              checked={vendors.includes(vendor)}
              onChange={() => toggleVendor(vendor)}
            />
            <span className="pl-0.5 text-xs">{vendor.name}</span>
          </label>
        ))}
      </div>
    </>
  );
}
