import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updatePrivateData } from '../functions/updatePrivateData';

// allow the user to update his password
export function useUpdatePrivateData() {
  const queryClient = useQueryClient();

  const {
    mutate: updatePassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: updatePrivateData,
    onSuccess: () => {
      toast.success('Your password was updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error?.message}`);
    },
  });

  return { updatePassword, isPending, error };
}
