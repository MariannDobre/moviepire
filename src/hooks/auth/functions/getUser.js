import supabase from '../../../services/supabase';

// get the current logged user
export async function getUser() {
  const { data: userSession } = await supabase.auth.getSession();
  if (!userSession.session) return null;

  const { data: userData, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return userData?.user;
}
