import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData } from '../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUserFn, isPending } = useMutation({
    mutationFn: updateUserData,
    onSuccess: ({ user }) => {
      toast.success('Your data was updated successfully.');
      queryClient.setQueryData(['user'], user);
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error?.message}`);
    },
  });

  return { updateCurrentUserFn, isPending };
}
