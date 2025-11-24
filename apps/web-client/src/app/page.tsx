import Hero from '@/app/components/hero/hero';
import { Box } from '@mui/material';
import { redirect } from 'next/navigation';

export default function Home() {
    redirect('/landing');

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
            width: '100%',
            alignItems: { xs: 'center', sm: 'flex-start' },
            justifyContent: 'space-between',
            bgcolor: 'background.paper',
          }}
        >
          <Hero imageUrl="hero.jpg" />
        </Box>
      </Box>
    </>
  );
}
