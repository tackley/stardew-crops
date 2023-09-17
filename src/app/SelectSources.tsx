import { Vendor, Vendors } from "@/calc/model";
import { Dispatch } from "react";
import * as R from "remeda";

type SelectedVendors = Vendor[];

interface Props {
  vendors: SelectedVendors;
  onChange: Dispatch<SelectedVendors>;
}

export function SelectVendors({ vendors, onChange }: Props) {
  function toggleVendor(v: Vendor) {
    if (vendors.includes(v)) {
      onChange(R.reject(vendors, (value) => value === v));
    } else {
      onChange([...vendors, v]);
    }
  }
  return (
    <div className="flex items-center flex-wrap">
      <span className="font-semibold">Sources</span>
      {R.toPairs(Vendors).map(([id, vendor]) => (
        <label key={id} className="px-1 flex items-center">
          <input
            key="src"
            type="checkbox"
            checked={vendors.includes(vendor)}
            onClick={() => toggleVendor(vendor)}
          />
          <span className="pl-0.5 text-xs">{vendor.name}</span>
        </label>
      ))}
    </div>
  );
}
