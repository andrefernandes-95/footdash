'use client';

import { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller, FieldValues } from 'react-hook-form';
import { BaseInputProps } from '@/app/types/base-input-props.type';

export function PasswordInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
}: BaseInputProps<T>) {
  const [show, setShow] = useState(false);

  const toggle = () => setShow(prev => !prev);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          type={show ? 'text' : 'password'}
          variant="filled"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.9)' } }}
          InputProps={{
            sx: {
              bgcolor: 'rgba(255,255,255,0.1)',
              color: 'white',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggle} edge="end">
                  {show ? (
                    <VisibilityOff sx={{ color: 'white' }} />
                  ) : (
                    <Visibility sx={{ color: 'white' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
