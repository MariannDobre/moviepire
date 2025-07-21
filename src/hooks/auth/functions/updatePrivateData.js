import supabase from '../../../services/supabase';

export async function updatePrivateData(newPassword) {
  const { data: pass, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);

  return pass;
}
