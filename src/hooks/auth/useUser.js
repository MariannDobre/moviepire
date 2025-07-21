import { useQuery } from '@tanstack/react-query';
import { getUser } from './functions/getUser';

// get the data about the current logged user
export function useUser() {
  const { data: user, isFetching } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  return { user, isFetching, isAuthenticated: user?.role === 'authenticated' };
}
