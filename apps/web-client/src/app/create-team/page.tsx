'use client';

import { Box, Typography, Stack, TextField, Button, Tooltip, useTheme, LinearProgress } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

export default function SignUpTwoStep() {
  const theme = useTheme();
  const { control, handleSubmit } = useForm();
  const [step, setStep] = useState(0);

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: theme.palette.grey[900],
        color: 'white',
        display: 'flex',
      }}
    >
      {/* Subtle floating particles effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '120%',
          height: '120%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
          animation: 'moveBackground 120s linear infinite',
          zIndex: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("/landing.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: 0,
          },
        }}
      />
      <style>{`
        @keyframes moveBackground {
          0% { background-position: 0 0; }
          100% { background-position: 1000px 1000px; }
        }
      `}</style>

      {/* Left panel form */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: '50%',
          minHeight: '100vh',
          p: 6,
          borderRadius: 0,
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          borderRight: '1px solid rgba(255, 255, 255, 0.18)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Step Indicator */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
            Step {step + 1} of 2
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(step + 1) * 50}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#19779B',
              },
            }}
          />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, mb: 6, color: 'white' }}>
          {step === 0 ? "Create Your User" : "Create Your Team"}
        </Typography>

        <Stack spacing={4}>
          {step === 0 && (
            <>
              <Controller
                name="username"
                control={control}
                rules={{ required: 'Username is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Username"
                    variant="filled"
                    fullWidth
                    placeholder="Your public username"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputLabelProps={{
                      sx: {
                        color: '#fff',
                      }
                    }}
                    InputProps={{
                      sx: {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        '&::label': { color: 'rgba(255,255,255,0.7)' },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    variant="filled"
                    fullWidth
                    placeholder="Your email address"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputLabelProps={{
                      sx: {
                        color: '#fff',
                      }
                    }}
                    InputProps={{
                      sx: {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&::placeholder': { color: 'rgba(255,255,255,0.7)' },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    variant="filled"
                    fullWidth
                    placeholder="Choose a strong password"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputLabelProps={{
                      sx: {
                        color: '#fff',
                      }
                    }}
                    InputProps={{
                      sx: {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&::placeholder': { color: 'rgba(255,255,255,0.7)' },
                      },
                    }}
                  />
                )}
              />

              <Button
                variant="outlined"
                size="large"
                sx={{
                  mt: 2,
                  px: 5,
                  py: 1.8,
                  borderRadius: 4,
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,.25)',
                  fontWeight: 900,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  transition: '.2s ease all',
                  '&:hover': { background: 'rgba(255,255,255,.25)' },
                }}
                onClick={handleNext}
              >
                Next: Team Info
              </Button>
            </>
          )}

          {step === 1 && (
            <>
              <Controller
                name="teamName"
                control={control}
                rules={{ required: 'Team name is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Team Name"
                    variant="filled"
                    fullWidth
                    placeholder="Your club’s name"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      sx: {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&::placeholder': { color: 'rgba(255,255,255,0.7)' },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="slug"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Team Slug (optional)"
                    variant="filled"
                    fullWidth
                    placeholder="friendly-url"
                    helperText={
                      <Tooltip title="If left empty, we’ll generate one for you">
                        <span style={{ cursor: 'help', color: 'rgba(255,255,255,0.7)' }}>
                          Friendly URL <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                        </span>
                      </Tooltip>
                    }
                    InputProps={{
                      sx: {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '&::placeholder': { color: 'rgba(255,255,255,0.7)' },
                      },
                    }}
                  />
                )}
              />

              <Stack direction="row" spacing={2}>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ fontWeight: 700 }}
                  onClick={handleBack}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 5,
                    py: 1.8,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.9)',
                    color: '#19779B',
                    fontWeight: 900,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    transition: '.2s ease all',
                    '&:hover': { background: 'rgba(255,255,255,1)' },
                  }}
                >
                  Create Your Team
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
