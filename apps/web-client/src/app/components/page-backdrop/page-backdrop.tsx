'use client';

import {
    Box,
} from '@mui/material';

interface Props {
    backgroundImage?: string;
    opacity?: number;
    filter?: string;
}

export default function PageBackdrop({ filter = 'none', backgroundImage = 'landing.jpg', opacity = 0.25}: Props) {
    return (
        <>
            {/* BACKGROUND + PARTICLES */}
            < Box
                sx={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    zIndex: 0,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url("/${backgroundImage}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter,
                        opacity,
                    },
                }
                }
            />
            < Box
                sx={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '120%',
                    height: '120%',
                    background:
                        'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '3px 3px',
                    animation: 'moveBG 160s linear infinite',
                    zIndex: 0,
                }}
            />
            < style > {`
        @keyframes moveBG {
          0% { background-position: 0 0; }
          100% { background-position: 1300px 1000px; }
        }
      `}</style >
        </>
    )
}