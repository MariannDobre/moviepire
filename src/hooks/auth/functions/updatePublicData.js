import supabase, { supabaseUrl } from '../../../services/supabase';

// calls the supabase client to update user username or user avatar
export async function updatePublicData({ newUsername, newAvatarFile }) {
  // 1. Update the USERNAME
  let updateTheData;
  if (newUsername) updateTheData = { data: { username: newUsername } };

  const { data, error } = await supabase.auth.updateUser(updateTheData);
  if (error) throw new Error(error.message);
  if (!newAvatarFile) return data;

  // 2. Upload the avatar to the storage bucket
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, newAvatarFile);
  if (storageError) throw new Error(storageError.message);

  // 3. Update the user_metadata object with the avatar
  // https://hmvzvkiygxglxhbnyvsm.supabase.co/storage/v1/object/public/avatars//tiganprost.png
  const { data: updateAvatar, error: updatedUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
      },
    });
  if (updatedUserError) throw new Error(updatedUserError.message);

  return updateAvatar;
}
