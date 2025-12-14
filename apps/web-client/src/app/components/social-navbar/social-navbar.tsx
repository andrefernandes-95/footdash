'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import { alpha, styled } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { AppConfig } from '@/app/data/config';
import { Button, Typography } from '@mui/material';
import { useAuth } from '@/app/hooks/useAuth';
import Logout from '@/app/components/buttons/logout/logout';
import Link from 'next/link';
import { AppRoutes } from '@/app/data/routes';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 999,
  backgroundColor: alpha(theme.palette.common.white, 0.12),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  marginLeft: theme.spacing(1),
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.5, 1, 0.5, 4),
    fontSize: 13,
  },
}));

export default function SocialNavbar() {
  const { user } = useAuth();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: AppConfig.TEAM_COLOR,
        height: 40,
        justifyContent: 'center',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: '40px !important',
          px: 2,
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {/* Left: Social Icons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            width: '100%',
          }}
        >
          <Tooltip title="Twitter">
            <IconButton size="small" color="secondary">
              <TwitterIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Instagram">
            <IconButton size="small" color="secondary">
              <InstagramIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Facebook">
            <IconButton size="small" color="secondary">
              <FacebookIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right: Search + Account */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <Search style={{ maxWidth: 200 }}>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Procurar..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          {!user ? (
            <>
              <Link href={AppRoutes.LOGIN}>
                <Button variant="text" color="secondary">
                  Login
                </Button>
              </Link>

              <Link href={AppRoutes.CREATE_ACCOUNT}>
                <Button variant="text" color="secondary">
                  Create Account
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Typography variant="body1">Hello {user.username}</Typography>
              <Logout />
            </>
          )}

          {/*
          <Tooltip title="Account">
            <IconButton size="small" sx={{ color: "#fff" }}>
              { Swap Avatar with AccountCircleIcon depending on auth }
              <AccountCircleIcon fontSize="small" />
              { <Avatar sx={{ width: 24, height: 24 }} /> }
            </IconButton>
          </Tooltip>*/}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
