"use client";

import { Button, ButtonProps } from "@mui/material";
import React from "react";

export interface Props {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonProps["variant"];
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function PrimaryButton({
  label,
  onClick,
  type = "button",
  variant = "outlined",
  disabled = false,
  fullWidth = false,
}: Props) {
  return (
    <Button
      variant={variant}
      type={type}
      disabled={disabled}
      fullWidth={fullWidth}
      size="large"
      sx={{
        mt: 2,
        px: 5,
        py: 1.8,
        borderRadius: 4,
        color: "#fff",
        borderColor: "rgba(255,255,255,.25)",
        fontWeight: 900,
        textTransform: "none",
        fontSize: "1.1rem",
        transition: ".2s ease all",
        "&:hover": { background: "rgba(255,255,255,.25)" },
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
