import { ActionIcon, Box, Flex, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import { BsCheck, BsX } from "react-icons/bs";
import { z } from "zod";
import { useValidatedState } from "@mantine/hooks";
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
  const [{ value: name, valid: validName }, setName] = useValidatedState(
    initialName,
    (value) => nameSchema.safeParse(value).success,
    true
  );
  const [
    { value: estimatedHour, valid: validEstimatedHour },
    setEstimatedHour,
  ] = useValidatedState(
    `${initialEstimatedHour}`,
    (value) => estimatedHourSchema.safeParse(value).success,
    true
  );
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEstimatedHourTouched, setIsEstimatedHourTouched] = useState(false);

  const handleSubmit = () => {
    if (!validName || !validEstimatedHour) {
      return;
    }
    onSubmit({
      name,
      estimatedHour: Number(estimatedHour),
      deleted: false,
    });
  };

  return (
    <tr>
      <td>{id ?? ""}</td>
      <td>
        <Box w={200}>
          <TextInput
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            onBlur={() => setIsNameTouched(true)}
            error={isNameTouched && !validName && "invalid format"}
          />
        </Box>
      </td>
      <td>
        <Box w={200}>
          <TextInput
            value={estimatedHour}
            onChange={(e) => setEstimatedHour(e.currentTarget.value)}
            onBlur={() => setIsEstimatedHourTouched(true)}
            error={
              isEstimatedHourTouched && !validEstimatedHour && "invalid format"
            }
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
