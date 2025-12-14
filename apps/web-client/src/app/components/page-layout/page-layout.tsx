import SocialNavbar from '@/app/components/social-navbar/social-navbar';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          bgcolor: 'background.default',
          fontFamily: 'sans-serif',
        }}
      >
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            alignItems: { xs: 'center', sm: 'flex-start' },
            bgcolor: 'background.paper',
          }}
        >
          <SocialNavbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
