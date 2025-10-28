import Slider from '../../utils/_slider/Slider';

export default function DiscoveryTable({ data }) {
  return (
    <div className='w-full h-[476px]'>
      <Slider
        data={data}
        itemsPerSlide={4}
        maxSlides={8}
        heightTAG='discovery-page'
        columns={4}
      />
    </div>
  );
}
