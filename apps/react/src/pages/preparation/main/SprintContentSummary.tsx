import { List } from "@mantine/core";
import { FC, useMemo } from "react";
import { useNestSprintPoint } from "../../../store/useNestSprintPoint";
import { useNextSprintTime } from "../../../store/useNestSprintTime";

export const SprintContentSummary: FC = () => {
  const points = useNestSprintPoint((state) => state.points);
  const times = useNextSprintTime((state) => state.times);

  const pointSum = useMemo(
    () => points.reduce((acc, cur) => acc + cur.point, 0),
    [points]
  );

  const timeSum = useMemo(
    () => times.reduce((acc, cur) => acc + cur.time, 0),
    [times]
  );

  const timeSumRegistered = useMemo(
    () =>
      times
        .filter((time) => !time.key.startsWith("ADD-"))
        .reduce((acc, cur) => acc + cur.time, 0),
    [times]
  );

  const timeSumAdd = useMemo(
    () =>
      times
        .filter((time) => time.key.startsWith("ADD-"))
        .reduce((acc, cur) => acc + cur.time, 0),
    [times]
  );

  return (
    <List>
      <List.Item>{`合計ポイント: ${pointSum} pt`}</List.Item>
      <List.Item>
        {`合計予定時間: ${timeSum} h`}
        <List withPadding>
          <List.Item>{`登録済みタスク: ${timeSumRegistered} h`}</List.Item>
          <List.Item>{`追加タスク: ${timeSumAdd} h`}</List.Item>
        </List>
      </List.Item>
    </List>
  );
};
