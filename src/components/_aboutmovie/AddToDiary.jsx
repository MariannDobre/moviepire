import { useUser } from '../../hooks/auth/useUser';
import { useAddToDiary } from '../../hooks/movies/mutations/useAddToDiary';
import { useRemoveFromDiary } from '../../hooks/movies/mutations/useRemoveFromDiary';
import { useRating } from '../../hooks/movies/useRating';
import { useMovieStatus } from '../../hooks/movies/useMovieStatus';
import toast from 'react-hot-toast';

import { FaPlus, FaMinus } from 'react-icons/fa';

export default function AddToDiary({ movie }) {
  const { user, isAuthenticated } = useUser();
  const { rating } = useRating(user?.id, movie?.id);
  const { viewedStatus } = useMovieStatus(user?.id, movie?.id);

  const movieRating = rating?.ratings || 0;
  const status = viewedStatus[0]?.is_favorite ?? null;
  const listOrder = Date.now();

  const {
    addToDiary,
    isPending: isAddingToDiary,
    error: addToDiaryErr,
  } = useAddToDiary(
    user?.id,
    movie?.id,
    movie?.movieName,
    movie?.movieYear,
    movie?.movieDuration,
    movieRating,
    listOrder
  );

  const {
    removeFromDiary,
    isPending: isRemovingFromDiary,
    error: removeFromDiaryErr,
  } = useRemoveFromDiary(user?.id, movie?.id, movie?.movieName);

  const handleToggleDiary = () => {
    if (!isAuthenticated) {
      toast.error(
        'You need to be logged in to add a title to the personal diary!'
      );
      return;
    }

    if (status) {
      try {
        removeFromDiary();
        toast.success('Title removed from your diary!');
      } catch (err) {
        toast.error(
          removeFromDiaryErr?.message || 'Failed to remove title from diary.'
        );
      }
    } else {
      try {
        addToDiary();
        toast.success('Title added to your diary!');
      } catch (err) {
        toast.error(addToDiaryErr?.message || 'Failed to add title to diary.');
      }
    }
  };

  return (
    <button
      type='button'
      onClick={handleToggleDiary}
      disabled={isAddingToDiary || isRemovingFromDiary}
      className='outline-none border border-transparent flex items-center justify-center text-center gap-1 md:gap-1.5 py-1 px-4 md:py-1.5 md:px-6 cursor-pointer text-xs md:text-sm text-white bg-blue-400 font-normal tracking-wide rounded-sm md:rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
    >
      <span>{status ? <FaMinus /> : <FaPlus />}</span>
      {status ? 'Remove from Diary' : 'Add Diary'}
    </button>
  );
}
