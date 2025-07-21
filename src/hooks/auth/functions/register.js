import supabase from '../../../services/supabase';

export async function register({
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
