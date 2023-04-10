import { Box } from "@mantine/core";
import { FC } from "react";

interface Props {
  sprintId: string | null;
  width: number;
  height: number;
}

export const StoryPointsGraph: FC<Props> = ({ sprintId, width, height }) => {
  return <div>story-point graph</div>;
};
