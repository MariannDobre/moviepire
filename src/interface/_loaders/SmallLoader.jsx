import { CgSpinner } from 'react-icons/cg';

function SmallLoader({
  width = 'w-auto',
  height = 'h-auto',
  size = 'text-base',
  color = 'text-white',
}) {
  return (
    <span
      className={`${width} ${height} ${size} ${color} flex items-center justify-center animate-spin`}
    >
      <CgSpinner />
    </span>
  );
}

export default SmallLoader;
