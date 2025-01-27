import PageContainer from '@/app/components/container/PageContainer';

// components
import Footer from '@/app/components/landingpage/footer/Footer';
import HpHeader from '@/app/components/shared/header/HpHeader';
import Banner from './banner';
import Pricing from '@/app/components/shared/pricing';

export default function PricingPage() {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <HpHeader />
      <Banner />
      <Pricing />
      <Footer />
    </PageContainer>
  );
}
