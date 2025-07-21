import supabase from '../../../services/supabase';

// get user data to log into the account
export async function login({ loginEmail, loginPassword }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password: loginPassword,
  });

  if (error) throw new Error(error.message);

  return data;
}
