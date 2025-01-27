import PageContainer from '@/app/components/container/PageContainer';

// components
import Banner from '@/app/components/landingpage/banner/Banner';
import Features from '@/app/components/landingpage/features/Features';
import Footer from '@/app/components/landingpage/footer/Footer';
import HpHeader from '../components/shared/header/HpHeader';
import Pricing from '../components/shared/pricing';

export default function Landingpage() {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <HpHeader />
      <Banner />
      <Features />
      <Pricing />
      <Footer />
    </PageContainer>
  );
}
