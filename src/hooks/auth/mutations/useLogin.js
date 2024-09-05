import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login } from '../functions/login';

// log the user into his account
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries('user');
      navigate('/', { replace: true });
      toast.success('You were logged in your account successfully.');
    },
    onError: (err) => {
      toast.error(
        `Something went wrong with your credentials: ${err?.message}`
      );
    },
  });

  return { loginUser, isPending };
}
