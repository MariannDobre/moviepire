import supabase from '../../../services/supabase';

// calls the supabase client to sign out the user
export async function signout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
