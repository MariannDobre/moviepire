import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signup } from '../functions/signup';

// register a new user to the app
export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signupUser, isPending } = useMutation({
    mutationFn: signup,
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

  return { signupUser, isPending };
}
