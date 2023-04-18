import { FC } from "react";

interface Props {
  sprintId: number;
}

export const SprintContentSub: FC<Props> = ({ sprintId }) => {
  return <>{sprintId}</>;
};
