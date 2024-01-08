import { TitleAndMetaTags } from '../../src/components/TitleAndMetaTags';
import HomeHeader from '../../src/components/home/HomeHeader';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function HomePage() {
  return (
    <>
      <TitleAndMetaTags
        title="NFTy Cards"
        description="Send greeting cards to friends."
        image="themes.png"
      />
      <HomeHeader />
    </>
  );
}
