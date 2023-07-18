import { ActionIcon, Box, Flex, MultiSelect, TextInput } from "@mantine/core";
import { FC, useCallback, useEffect, useState } from "react";
import { BsCheck, BsX } from "react-icons/bs";
import { z } from "zod";
import { useValidatedState } from "@mantine/hooks";
import { ItemProps } from "../../../store/useTempTaskItems";

const nameSchema = z.string().min(1);
const estimatedHourSchema = z.preprocess(
  (v) => Number(v),
  z.number({ invalid_type_error: "invalid format" }).min(0).max(50),
);

export type NewItem = Omit<ItemProps, "deleted"> & { labels: string[] };

interface Props {
  initialItem: NewItem;
  onSubmit: (item: NewItem) => void;
  onCancel: () => void;
  forceSubmit?: boolean;
}

export const SprintIssueNewTaskForm: FC<Props> = ({
  initialItem,
  onSubmit,
  onCancel,
  forceSubmit = false,
}) => {
  const [{ value: name, valid: validName }, setName] = useValidatedState(
    initialItem.name,
    (value) => nameSchema.safeParse(value).success,
    true,
  );
  const [
    { value: estimatedHour, valid: validEstimatedHour },
    setEstimatedHour,
  ] = useValidatedState(
    `${initialItem.estimatedHour}`,
    (value) => estimatedHourSchema.safeParse(value).success,
    true,
  );
  const [labels, setLabels] = useState([...initialItem.labels]);
  const [labelData, setLabelData] = useState(
    labels.map((label) => ({ label, value: label })),
  );

  const handleSubmit = useCallback(() => {
    if (!validName || !validEstimatedHour) {
      return;
    }
    onSubmit({
      name,
      estimatedHour: Number(estimatedHour),
      labels,
    });
  }, [estimatedHour, labels, name, onSubmit, validEstimatedHour, validName]);

  useEffect(() => {
    if (forceSubmit) {
      handleSubmit();
    }
  }, [forceSubmit, handleSubmit]);

  return (
    <tr>
      <td>追加</td>
      <td> </td>
      <td>
        <Box>
          <TextInput
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            error={!validName}
          />
        </Box>
      </td>
      <td>
        <Box>
          <TextInput
            value={estimatedHour}
            onChange={(e) => setEstimatedHour(e.currentTarget.value)}
            error={!validEstimatedHour}
          />
        </Box>
      </td>
      <td>
        <MultiSelect
          data={labelData}
          value={labels}
          searchable
          creatable
          clearable
          getCreateLabel={(query) => `+ Create ${query}`}
          onCreate={(query) => {
            const item = { value: query, label: query };
            setLabelData((current) => [...current, item]);
            return item;
          }}
          onChange={(value) => setLabels(value)}
        />
      </td>
      <td>
        <Flex sx={{ gap: 24 }} justify="flex-end">
          <ActionIcon color="indigo" variant="filled" onClick={handleSubmit}>
            <BsCheck />
          </ActionIcon>
          <ActionIcon color="indigo" variant="outline" onClick={onCancel}>
            <BsX />
          </ActionIcon>
        </Flex>
      </td>
    </tr>
  );
};
