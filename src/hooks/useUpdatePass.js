import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserPassword, sendRecoveryPass } from '../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUserPass() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUserPassFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success('Your password was updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error?.message}`);
    },
  });

  return { updateUserPassFn, isPending, error };
}

//

export function useRecoverPass() {
  const {
    mutate: sendRecoveryPassFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: sendRecoveryPass,
    onSuccess: () => {
      toast.success('An email for password resetting was sent successfully.');
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error?.message}`);
    },
  });

  return { sendRecoveryPassFn, isPending, error };
}
