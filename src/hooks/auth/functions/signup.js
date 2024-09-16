import supabase from '../../../services/supabase';

// calls the supabase client to create a new record for a new user with the passed data
export async function signup({
  registerUsername,
  registerEmail,
  registerPassword,
}) {
  const { data, error } = await supabase.auth.signUp({
    email: registerEmail,
    password: registerPassword,
    options: {
      data: {
        username: registerUsername,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
