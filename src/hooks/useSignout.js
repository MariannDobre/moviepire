import { useMutation } from '@tanstack/react-query';
import { signout } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useSignout() {
  const navigate = useNavigate();

  const { mutate: signoutFn, isPending } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      navigate('/', { replace: true });
      toast.success('You were logged out successfully.');
    },
    onError: (err) => {
      console.log(`An error occured:`, err);
      toast.error(`An error occured: ${err?.message}`);
    },
  });

  return { signoutFn, isPending };
}
