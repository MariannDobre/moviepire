import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updatePublicData } from '../functions/updatePublicData';

// allow the user to update his username or his avatar
export function useUpdatePublicData() {
  const queryClient = useQueryClient();

  const { mutate: updateUserPublicData, isPending } = useMutation({
    mutationFn: updatePublicData,
    onSuccess: ({ user }) => {
      toast.success('Your data was updated successfully.');
      queryClient.setQueryData(['user'], user);
    },
    onError: (error) => {
      toast.error(`Something went wrong: ${error?.message}`);
    },
  });

  return { updateUserPublicData, isPending };
}
