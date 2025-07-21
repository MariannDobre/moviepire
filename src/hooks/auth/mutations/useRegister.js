import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { register } from '../functions/register';
import toast from 'react-hot-toast';

export function useRegister() {
  const navigate = useNavigate();

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      navigate('/confirm-email', { replace: true });
      toast.success(
        'Your account has been created successfully. Verify your email address.'
      );
    },
    onError: (err) => {
      toast.error(`Something went wrong: ${err.message}`);
    },
  });

  return { registerUser, isPending };
}
