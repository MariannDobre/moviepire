import supabase, { supabaseUrl } from '../../../services/supabase';

// calls the supabase client to update user username or user avatar
export async function updatePublicData({ username, avatar }) {
  // 1. Update the USERNAME
  let updateTheData;
  if (username) updateTheData = { data: { username } };

  const { data, error } = await supabase.auth.updateUser(updateTheData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar to the storage bucket
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. Update the user_metadata object with the avatar
  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updatedUserError) throw new Error(updatedUserError.message);

  return updatedUser;
}
