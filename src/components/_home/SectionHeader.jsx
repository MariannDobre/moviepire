import { memo } from 'react';

const SectionHeader = memo(({ title, subtitle }) => {
  return (
    <div className='w-full h-auto flex flex-col gap-1.5'>
      <h6 className='text-white text-2xl font-medium tracking-wide'>{title}</h6>

      <p className='text-neutral-400 text-base font-normal tracking-wider'>
        {subtitle}
      </p>
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
