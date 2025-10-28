import {
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiReacthookform,
  SiSupabase,
  SiTailwindcss,
  SiMaterialdesignicons,
} from 'react-icons/si';
import { FaBreadSlice } from 'react-icons/fa6';
import { VscBracketError } from 'react-icons/vsc';

const technologies = [
  {
    id: 1,
    label: 'React 18',
    icon: <SiReact />,
  },
  {
    id: 2,
    label: 'React Router',
    icon: <SiReactrouter />,
  },
  {
    id: 3,
    label: 'React Query',
    icon: <SiReactquery />,
  },
  {
    id: 4,
    label: 'React Hook Form',
    icon: <SiReacthookform />,
  },
  {
    id: 5,
    label: 'React Error Boundary',
    icon: <VscBracketError />,
  },
  {
    id: 6,
    label: 'React Hot Toast',
    icon: <FaBreadSlice />,
  },
  {
    id: 7,
    label: 'React Icons',
    icon: <SiMaterialdesignicons />,
  },
  {
    id: 8,
    label: 'Supabase',
    icon: <SiSupabase />,
  },
  {
    id: 9,
    label: 'Tailwind CSS',
    icon: <SiTailwindcss />,
  },
];

export default function Technologies() {
  return (
    <div className='w-full h-auto flex flex-col items-start gap-6'>
      <h1 className='text-white text-2xl font-medium tracking-wide'>
        <span className='text-amber-400'>02.</span>&nbsp;Core Technologies
      </h1>

      <div className='w-full h-auto grid grid-cols-4 grid-rows-3 gap-9'>
        {technologies.map((tech) => (
          <div
            key={tech.id}
            className='group w-full h-52 flex flex-col items-center justify-center gap-3 p-6 bg-yellow-950/45 border border-yellow-500 rounded-md'
          >
            <span className='text-neutral-200 text-2xl group-hover:text-white group-hover:text-5xl group-focus-visible:text-white group-focus-visible:text-5xl transition-all duration-300'>
              {tech.icon}
            </span>

            <p className='text-neutral-400 text-base font-medium tracking-wide text-center group-hover:text-neutral-200 group-hover:text-xl group-focus-visible:text-neutral-200 group-focus-visible:text-xl transition-all duration-300'>
              {tech.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
