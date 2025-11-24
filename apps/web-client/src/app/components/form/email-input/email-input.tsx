'use client';

import { FieldValues } from 'react-hook-form';
import { BaseInputProps } from '@/app/types/base-input-props.type';
import TextInput from '@/app/components/form/text-input/text-input';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InputAdornment from '@mui/material/InputAdornment';

export function EmailInput<T extends FieldValues>(props: BaseInputProps<T>) {
  return (
    <TextInput
      {...props}
      type="email"
      placeholder={props.placeholder ?? 'email@example.com'}
    />
  );
}
