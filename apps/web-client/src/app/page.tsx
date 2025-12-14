import Hero from '@/app/components/hero/hero';
import PageLayout from '@/app/components/page-layout/page-layout';

export default function Home() {
  return (
    <>
      <PageLayout>
        <Hero imageUrl="hero.jpg" />
      </PageLayout>
    </>
  );
}
