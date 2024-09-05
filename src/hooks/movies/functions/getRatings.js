import supabase from '../../../services/supabase';

// calls the supabase client to send back the ratings record of each user
export async function getRatings(userId) {
  const { data, error } = await supabase
    .from('ratings')
    .select('id, item_id ,ratings')
    .eq('user_id', userId);

  if (error)
    throw new Error(
      `An error occurred while fetching the ratings: ${error?.message}`
    );

  return data;
}
