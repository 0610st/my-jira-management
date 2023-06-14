import { FC } from "react";
import { SprintLabel } from "./SprintLabel";

export const SprintLabelForGraph: FC<unknown> = (props) => {
  const { x, y, payload } = props as {
    x: number;
    y: number;
    payload: { value: number };
  };

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        <SprintLabel sprintId={payload.value} />
      </text>
    </g>
  );
};
