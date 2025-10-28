import { useUser } from '../../hooks/auth/useUser';
import { useAddToDiary } from '../../hooks/movies/mutations/useAddToDiary';
import { useRemoveFromDiary } from '../../hooks/movies/mutations/useRemoveFromDiary';
import { useRating } from '../../hooks/movies/useRating';
import { useMovieStatus } from '../../hooks/movies/useMovieStatus';
import toast from 'react-hot-toast';

import { FaPlus, FaMinus } from 'react-icons/fa6';

export default function AddToDiary({
  movieID,
  movieName,
  movieYear,
  movieDuration,
}) {
  const { user, isAuthenticated } = useUser();
  const { rating } = useRating(user?.id, movieID);
  const { viewedStatus } = useMovieStatus(user?.id, movieID);

  const movieRating = rating?.ratings || 0;
  const status = viewedStatus[0]?.is_favorite ?? null;
  const listOrder = Date.now();

  const {
    addToDiary,
    isPending: isAddingToDiary,
    error: addToDiaryErr,
  } = useAddToDiary(
    user?.id,
    movieID,
    movieName,
    movieYear,
    movieDuration,
    movieRating,
    listOrder
  );
  const {
    removeFromDiary,
    isPending: isRemovingFromDiary,
    error: removeFromDiaryErr,
  } = useRemoveFromDiary(user?.id, movieID, movieName);

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
      disabled={isAddingToDiary || isRemovingFromDiary}
      onClick={handleToggleDiary}
      className='group outline-none border border-neutral-700 cursor-pointer rounded-md w-72 h-auto bg-white/15 text-neutral-400 text-sm font-medium tracking-wide py-1.5 px-3 flex items-center justify-center gap-1 text-center hover:text-white focus-visible:text-white transition-colors duration-300'
    >
      <span className='text-base group-hover:text-amber-400 group-focus-visible:text-amber-400 transition-colors duration-300'>
        {status ? <FaMinus /> : <FaPlus />}
      </span>
      &nbsp;{status ? 'Remove from Diary' : 'Add to Diary'}
    </button>
  );
}
