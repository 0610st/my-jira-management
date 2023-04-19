import { ActionIcon, Box, Flex, MultiSelect, TextInput } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { BsCheck, BsX } from "react-icons/bs";
import { z, ZodError } from "zod";
import { ItemProps } from "../../../store/useTempTaskItems";

const nameSchema = z.string().min(1);
const estimatedHourSchema = z.preprocess(
  (v) => Number(v),
  z.number({ invalid_type_error: "invalid format" }).min(0).max(50)
);

export type NewItem = Omit<ItemProps, "deleted"> & { labels: string[] };

interface Props {
  initialItem: NewItem;
  onSubmit: (item: NewItem) => void;
  onCancel: () => void;
}

export const SprintIssueNewTaskForm: FC<Props> = ({
  initialItem,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(initialItem.name);
  const [nameError, setNameError] = useState("");
  const [estimatedHour, setEstimatedHour] = useState(
    `${initialItem.estimatedHour}`
  );
  const [estimatedHourError, setEstimatedHourError] = useState("");
  const [labels, setLabels] = useState([...initialItem.labels]);
  const [labelData, setLabelData] = useState(
    labels.map((label) => ({ label: label, value: label }))
  );

  useEffect(() => {
    try {
      nameSchema.parse(name);
      setNameError("");
    } catch (e) {
      if (e instanceof ZodError) {
        setNameError(e.issues[0].message);
      }
    }
  }, [name]);

  useEffect(() => {
    try {
      estimatedHourSchema.parse(estimatedHour);
      setEstimatedHourError("");
    } catch (e) {
      if (e instanceof ZodError) {
        setEstimatedHourError(e.issues[0].message);
      }
    }
  }, [estimatedHour]);

  const handleSubmit = () => {
    const parsedName = nameSchema.parse(name);
    const parsedEstimatedHour = estimatedHourSchema.parse(estimatedHour);
    if (
      parsedName.hasOwnProperty("error") ||
      parsedEstimatedHour.hasOwnProperty("error")
    ) {
      return;
    }
    onSubmit({
      name: parsedName,
      estimatedHour: parsedEstimatedHour,
      labels,
    });
  };

  return (
    <tr>
      <td></td>
      <td>
        <Box>
          <TextInput
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            error={nameError}
          />
        </Box>
      </td>
      <td>
        <Box>
          <TextInput
            value={estimatedHour}
            onChange={(e) => setEstimatedHour(e.currentTarget.value)}
            error={estimatedHourError}
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
