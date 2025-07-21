import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../functions/login';
import toast from 'react-hot-toast';

// log the user into his account
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: ({ loginEmail, loginPassword }) =>
      login({ loginEmail, loginPassword }),
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
