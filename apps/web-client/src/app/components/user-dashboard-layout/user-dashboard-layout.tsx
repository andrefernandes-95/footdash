'use client';

import {
  Box,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PageBackdrop from '@/app/components/page-backdrop/page-backdrop';

export default function UserDashboardLayout({ children, user }: { children: React.ReactNode, user: any }) {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Overview', icon: <DashboardIcon />, path: '/user' },
    { label: 'Account Settings', icon: <SettingsIcon />, path: '/user/edit-profile' },
    { label: 'Logout', icon: <LogoutIcon />, path: '/logout' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#0A0A0A',
        color: 'white',
        display: 'flex',
      }}
    >
      <PageBackdrop />
      {/* LEFT SIDEBAR */}
      <Box
        sx={{
          width: 260,
          backdropFilter: 'blur(18px)',
          background: 'rgba(255,255,255,0.07)',
          borderRight: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '4px 0px 20px rgba(0,0,0,0.3)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ p: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src="/user.png"
              sx={{
                width: 48,
                height: 48,
                border: '2px solid rgba(255,255,255,0.4)',
              }}
            />
            <Box>
              <Typography sx={{ fontSize: '1rem', opacity: 0.8 }}>
                Welcome
              </Typography>
              <Tooltip title={user?.username || ''}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '150px', // required for truncation
                    cursor: 'default',
                  }}
                >
                  {user?.username}
                </Typography>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ opacity: 0.1 }} />

        <List sx={{ mt: 2 }}>
          {menuItems.map(({ label, icon, path }) => {
            const active = pathname === path;

            return (
              <Link href={path} key={path} style={{ textDecoration: 'none' }}>
                <ListItemButton
                  sx={{
                    py: 1.8,
                    px: 3,
                    my: 0.7,
                    borderRadius: 2,
                    mx: 1,
                    color: 'white',
                    background: active ? 'rgba(255,255,255,0.16)' : 'transparent',
                    backdropFilter: active ? 'blur(8px)' : 'none',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(6px)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Box>

      {/* MAIN CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          zIndex: 2,
          p: 5,
        }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            p: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
