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
    alpha,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PageBackdrop from '@/app/components/page-backdrop/page-backdrop';
import { Team } from '@/app/types/models';

interface TeamDashboardLayoutProps {
    children: React.ReactNode;
    team: Team;
}

export default function TeamDashboardLayout({ children, team }: TeamDashboardLayoutProps) {
    const pathname = usePathname();

    const menuItems = [
        { label: 'Overview', icon: <DashboardIcon />, path: `/teams/${team.slug}` },
        { label: 'Members', icon: <GroupsIcon />, path: `/teams/${team.slug}/members` },
        { label: 'Shop', icon: <StoreIcon />, path: `/teams/${team.slug}/shop` },
        { label: 'Settings', icon: <SettingsIcon />, path: `/teams/${team.slug}/settings` },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                // If you want it darker and more subtle:
                    background: `linear-gradient(
                rgba(0, 0, 0, .5),  /* dark base layer */
                rgba(0, 0, 0, .9)
                ), ${team.color}`,          // team color on top
                color: 'white',
                display: 'flex',
            }}
        >
            <PageBackdrop backgroundImage={`backoffice.jpg`} opacity={.15} filter="grayscale(1)" />

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
                            src={team.avatarUrl || '/team.png'}
                            sx={{
                                width: 48,
                                height: 48,
                                border: '2px solid rgba(255,255,255,0.4)',
                            }}
                        />
                        <Box>
                            <Typography sx={{ fontSize: '1rem', opacity: 0.8 }}>
                                Team
                            </Typography>
                            <Tooltip title={team.name}>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: '1.2rem',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '150px',
                                        cursor: 'default',
                                    }}
                                >
                                    {team.name}
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
