import SmallLoader from './SmallLoader';

function PageContentLoader() {
  return (
    <div className='w-full h-[calc(100vh-72px)] p-6 flex flex-col items-center justify-center gap-3'>
      <h6 className='w-full h-auto text-white text-2xl font-medium tracking-wide text-center'>
        The content is loading.
        <br />
        It may take a few moments!
      </h6>

      <SmallLoader
        size='text-5xl'
        color='text-yellow-500'
      />

      <p className='w-full max-w-[1024px] h-auto text-lg text-gray-400 font-normal tracking-wider lg:tracking-wide text-center'>
        Did you know that
        <br />
        Some scenes are shot over 50 times to get them right.
        <br />
        Director Stanley Kubrick was famous for doing over 100 takes of a single
        scene to capture the perfect performance.
      </p>
    </div>
  );
}

export default PageContentLoader;
