import SectionHeader from '../components/_home-page/SectionHeader';
import Architecture from '../components/_hot-it-works-page/Architecture';
import DataFlow from '../components/_hot-it-works-page/DataFlow';
import Introduction from '../components/_hot-it-works-page/Introduction';
import Technologies from '../components/_hot-it-works-page/Technologies';

export default function HowItWorksPage() {
  return (
    <div className='w-full h-auto flex flex-col items-center gap-16'>
      <SectionHeader
        title='Under the Hood'
        subtitle='Discover the technologies and patterns that power Moviepire'
      />

      <Introduction />

      <Technologies />

      <Architecture />

      <DataFlow />
    </div>
  );
}
