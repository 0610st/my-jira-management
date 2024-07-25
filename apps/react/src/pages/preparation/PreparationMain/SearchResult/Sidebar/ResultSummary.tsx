import { Flex, Text } from "@mantine/core";
import { GiProgression } from "react-icons/gi";
import { FC, useMemo } from "react";
import { IoIosTimer } from "react-icons/io";
import { useNextSprintPoint } from "@/store/useNextSprintPoint";
import { useNextSprintTime } from "@/store/useNextSprintTime";
import { useExcludeEpics } from "@/store/useExcludeEpics";

export const ResultSummary: FC = () => {
  const points = useNextSprintPoint((state) => state.points);
  const times = useNextSprintTime((state) => state.times);
  const excludeEpics = useExcludeEpics((state) => state.excludeEpics);

  const pointSum = useMemo(
    () =>
      points
        .filter((point) => !excludeEpics.includes(point.key))
        .reduce((acc, cur) => acc + cur.point, 0),
    [excludeEpics, points],
  );

  const timeSum = useMemo(
    () => times.reduce((acc, cur) => acc + cur.time, 0),
    [times],
  );

  const timeSumAdd = useMemo(
    () =>
      times
        .filter((time) => time.key.startsWith("ADD-"))
        .reduce((acc, cur) => acc + cur.time, 0),
    [times],
  );

  return (
    <Flex justify="space-between">
      <Flex align="center" justify="flex-start" sx={{ flexBasis: "50%" }}>
        <GiProgression size="1.2rem" />
        <Text ml={2}>{pointSum} pt</Text>
      </Flex>
      <Flex align="center" justify="flex-start" sx={{ flexBasis: "50%" }}>
        <IoIosTimer size="1.2rem" />
        <Text ml={2}>
          {timeSum} h{timeSumAdd > 0 && ` (+ ${timeSumAdd} h)`}
        </Text>
      </Flex>
    </Flex>
  );
};
