'use client';

import { BaseInputProps } from '@/app/types/base-input-props.type';
import { TextField } from '@mui/material';
import { Controller, FieldValues } from 'react-hook-form';

export default function TextInput<T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
}: BaseInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth
          variant="filled"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          color="primary"
        />
      )}
    />
  );
}
