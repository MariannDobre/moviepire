import supabase from '../../../services/supabase';

// calls the supabase client to create a new record for a new user with the passed data
export async function signup({ username, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
