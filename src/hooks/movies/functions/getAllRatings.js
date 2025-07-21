import supabase from '../../../services/supabase';

export async function getAllRatings(userId) {
  const { data, error } = await supabase
    .from('ratings')
    .select('*, movies(movieName)')
    .eq('user_id', userId);

  if (error)
    throw new Error(
      `An error occurred while fetching all ratings: ${error?.message}`
    );

  return data;
}
