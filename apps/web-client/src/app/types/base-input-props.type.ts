import { FilledInputProps, InputProps, OutlinedInputProps } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export interface BaseInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  InputProps?: Partial<FilledInputProps> | Partial<OutlinedInputProps> | Partial<InputProps> | undefined;
}
