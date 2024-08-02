import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/apiAuth';
import toast from 'react-hot-toast';

export default function useSignup() {
  const navigate = useNavigate();

  const { mutate: createUserFn, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (user) => {
      console.log(user);
      navigate('/confirm-email', { replace: true });
      toast.success(
        'Your account has been created successfully. Verify your email address.'
      );
    },
  });

  return { createUserFn, isPending };
}
