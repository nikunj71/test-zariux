import PageContainer from '@/app/components/container/PageContainer';

// components
import Footer from '@/app/components/landingpage/footer/Footer';
import HpHeader from '@/app/components/shared/header/HpHeader';
import Banner from './banner';

export default function Features() {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <HpHeader />
      <Banner />
      <Footer />
    </PageContainer>
  );
}
