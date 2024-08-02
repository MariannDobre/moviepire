import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/apiAuth';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginFn, isPending } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries('user');
      navigate('/', { replace: true });
      toast.success('You were logged in your account successfully.');
    },
    onError: (err) => {
      console.log(`An error occured:`, err);
      toast.error(
        `Something went wrong with your credentials: ${err?.message}`
      );
    },
  });

  return { loginFn, isPending };
}
