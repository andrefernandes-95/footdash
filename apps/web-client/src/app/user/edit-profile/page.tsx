"use client";

import { Box, Stack, TextField, Button, Typography, Avatar } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import UserDashboardLayout from "@/app/components/user-dashboard-layout/user-dashboard-layout";
import { useAuth } from "@/app/hooks/useAuth";

interface ProfileFormValues {
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
}

export default function EditProfilePage() {
  const { control, handleSubmit } = useForm<ProfileFormValues>();
  const [avatar, setAvatar] = useState<string | null>(null);

    const { user } = useAuth()
  
  const onSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
  };

  const handleAvatarUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  return (
    <UserDashboardLayout user={user}>
      {/* Glass Panel */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          p: 6,
          borderRadius: 5,
          backdropFilter: "blur(20px)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          color: "white",
        }}
      >
        <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>
          Edit Profile
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            {/* Avatar Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Avatar
                src={avatar || "/default-avatar.png"}
                sx={{ width: 100, height: 100, border: "3px solid rgba(255,255,255,0.3)" }}
              />
              <div>
                <Typography sx={{ mb: 1, fontWeight: 600 }}>Profile Picture</Typography>

                <input
                  id="avatar-upload"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
                <label htmlFor="avatar-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(255,255,255,0.3)",
                      color: "white",
                      "&:hover": { background: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    Upload New
                  </Button>
                </label>
              </div>
            </Box>

            {/* Two-column layout */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
              {/* First Name */}
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{ sx: { color: "white" } }}
                    InputProps={{
                      sx: {
                        bgcolor: "rgba(255,255,255,0.1)",
                        color: "white",
                        "&::placeholder": { color: "rgba(255,255,255,0.6)" },
                      },
                    }}
                  />
                )}
              />

              {/* Last Name */}
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="filled"
                    fullWidth
                    InputLabelProps={{ sx: { color: "white" } }}
                    InputProps={{
                      sx: {
                        bgcolor: "rgba(255,255,255,0.1)",
                        color: "white",
                      },
                    }}
                  />
                )}
              />
            </Stack>

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  variant="filled"
                  fullWidth
                  placeholder="+1 555 123 4567"
                  InputLabelProps={{ sx: { color: "white" } }}
                  InputProps={{
                    sx: {
                      bgcolor: "rgba(255,255,255,0.1)",
                      color: "white",
                    },
                  }}
                />
              )}
            />

            {/* Date of Birth */}
            <Controller
              name="date_of_birth"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date of Birth"
                  type="date"
                  variant="filled"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "white" },
                  }}
                  InputProps={{
                    sx: {
                      bgcolor: "rgba(255,255,255,0.1)",
                      color: "white",
                    },
                  }}
                />
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                alignSelf: "flex-start",
                mt: 2,
                px: 5,
                py: 1.8,
                borderRadius: 4,
                background: "rgba(255,255,255,0.9)",
                color: "#19779B",
                fontWeight: 900,
                textTransform: "none",
                fontSize: "1.1rem",
                "&:hover": { background: "white" },
              }}
            >
              Save Changes
            </Button>
          </Stack>
        </form>
    </Box>
    </UserDashboardLayout>
  );
}
