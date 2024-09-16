import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signout } from '../functions/signout';
import toast from 'react-hot-toast';

// sign out the user from his account
export function useSignout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signoutUser, isPending } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.invalidateQueries('user');
      navigate('/', { replace: true });
      toast.success('You were logged out successfully.');
    },
    onError: (err) => {
      toast.error(`An error occured: ${err?.message}`);
    },
  });

  return { signoutUser, isPending };
}
