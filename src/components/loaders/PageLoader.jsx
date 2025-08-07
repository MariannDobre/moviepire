import { CgSpinner } from 'react-icons/cg';

function PageLoader() {
  return (
    <section className='w-screen h-screen bg-black flex flex-col gap-3 lg:gap-6 items-center justify-center'>
      <h6 className='text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-blue-400 font-medium tracking-wide text-center'>
        The page is currently loading.
        <br />
        It may take a few moments!
      </h6>

      <span className='text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white text-center animate-spin'>
        <CgSpinner />
      </span>

      <p className='text-sm lg:text-base xl:text-lg text-gray-400 font-normal tracking-wider lg:tracking-wide text-center w-full max-w-[960px]'>
        Did you know that
        <br />
        Some scenes are shot over 50 times to get them right.
        <br />
        Director Stanley Kubrick was famous for doing over 100 takes of a single
        scene to capture the perfect performance.
      </p>
    </section>
  );
}

export default PageLoader;
