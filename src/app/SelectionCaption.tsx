import { PropsWithChildren } from "react";

export function SelectionCaption(props: PropsWithChildren) {
  return <span className="font-semibold">{props.children}</span>;
}
