import { ActionIcon, Box, Flex, TextInput } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { BsCheck, BsX } from "react-icons/bs";
import { z, ZodError } from "zod";
import { ItemProps } from "../../../store/useTempTaskItems";

const nameSchema = z.string().min(1);
const estimatedHourSchema = z.preprocess(
  (v) => Number(v),
  z.number({ invalid_type_error: "invalid format" }).min(0).max(50)
);

interface Props {
  id?: number;
  initialName?: string;
  initialEstimatedHour?: number;
  onSubmit: (data: ItemProps) => void;
  onCancel: () => void;
}

export const TempTaskTableForm: FC<Props> = ({
  id,
  initialName = "",
  initialEstimatedHour = 0,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(initialName);
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [nameError, setNameError] = useState("");
  const [estimatedHour, setEstimatedHour] = useState(`${initialEstimatedHour}`);
  const [isEstimatedHourTouched, setIsEstimatedHourTouched] = useState(false);
  const [estimatedHourError, setEstimatedHourError] = useState("");

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
      Object.prototype.hasOwnProperty.call(parsedName, "error") ||
      Object.prototype.hasOwnProperty.call(parsedEstimatedHour, "error")
    ) {
      return;
    }
    onSubmit({
      name: parsedName,
      estimatedHour: parsedEstimatedHour,
      deleted: false,
    });
  };

  return (
    <tr>
      <td>{id !== undefined ? id : ""}</td>
      <td>
        <Box w={200}>
          <TextInput
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            onBlur={() => setIsNameTouched(true)}
            error={isNameTouched && nameError}
          />
        </Box>
      </td>
      <td>
        <Box w={200}>
          <TextInput
            value={estimatedHour}
            onChange={(e) => setEstimatedHour(e.currentTarget.value)}
            onBlur={() => setIsEstimatedHourTouched(true)}
            error={isEstimatedHourTouched && estimatedHourError}
          />
        </Box>
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
