import { FC, useMemo } from "react";
import { useSprints } from "../../../api/hooks";

const SEARCH_KEY = "スプリント ";

interface Props {
  sprintId: number;
}

export const SprintLabel: FC<Props> = ({ sprintId }) => {
  const { data: sprints } = useSprints();

  const label = useMemo(() => {
    if (!sprints) {
      return sprintId;
    }
    const name = sprints.find((sprint) => sprint.id === sprintId)?.name;

    if (!name) return sprintId;

    return name.slice(name.indexOf(SEARCH_KEY) + SEARCH_KEY.length);
  }, [sprintId, sprints]);

  if (!sprints) {
    return <>{sprintId}</>;
  }

  return <>{label}</>;
};
