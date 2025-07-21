import { FaFilm, FaRegStar, FaRegCalendarAlt } from 'react-icons/fa';
import { FaArrowTrendUp } from 'react-icons/fa6';
import { HiOutlineBookOpen } from 'react-icons/hi';

const cardsData = [
  {
    icon: <HiOutlineBookOpen />,
    title: 'Personal Diary',
    body: "Keep a detailed record of every movie and series you watch. Add them to your personal diary and never forget what you've seen.",
  },
  {
    icon: <FaRegStar />,
    title: 'Rate & Review',
    body: 'Rate your favorite movies and series on a 10-star scale. Build your personal taste profile and see your rating patterns over time.',
  },
  {
    icon: <FaArrowTrendUp />,
    title: 'Track Your Stats',
    body: "Monitor your viewing habits with detailed statistics. See how many movies you've watched, your average ratings, and more.",
  },
  {
    icon: <FaRegCalendarAlt />,
    title: 'Discover New Content',
    body: 'Explore curated lists of classic films and the latest releases. Find your next favorite movie or series to watch.',
  },
  {
    icon: <FaFilm />,
    title: 'Timeline View',
    body: 'See your viewing history organized by date. Track your movie-watching journey throughout the years.',
  },
];

export default function AboutCards() {
  return (
    <div className='w-full h-auto grid grid-cols-4 gap-6'>
      {cardsData.map((card, index) => (
        <div
          key={index}
          className='w-full h-auto p-6 flex flex-col gap-3 rounded-lg shadow-sm bg-gradient-to-br from-transparent to-gray-50/10 border border-neutral-500'
        >
          <span className='text-3xl text-blue-400 self-start'>{card.icon}</span>

          <h6 className='text-2xl text-white font-medium tracking-wide'>
            {card.title}
          </h6>

          <p className='w-full self-start text-start text-lg text-gray-400 font-normal tracking-wide'>
            {card.body}
          </p>
        </div>
      ))}
    </div>
  );
}
