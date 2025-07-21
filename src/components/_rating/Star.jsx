import { FaStar, FaRegStar } from 'react-icons/fa';

export default function Star({
  full,
  onRate,
  onHoverIn,
  onHoverOut,
  starColor,
  starSize,
}) {
  return (
    <span
      role='button'
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      className={`${starColor} ${starSize} block cursor-pointer`}
    >
      {full ? <FaStar /> : <FaRegStar />}
    </span>
  );
}
