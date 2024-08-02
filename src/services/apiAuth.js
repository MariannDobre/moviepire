import supabase from './supabase';
import { supabaseUrl } from './supabase';

// LOG IN THE USER

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: userSession } = await supabase.auth.getSession();
  if (!userSession.session) return null;

  const { data: userData, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return userData?.user;
}

// SIGN OUT THE USER

export async function signout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// SIGN UP A NEW USER / CREATE A NEW USER

export async function createUser({ username, email, password }) {
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

// CHANGE USER DATA

export async function updateUserData({ username, avatar }) {
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

// CHANGE USER PASSWORD

export async function updateUserPassword(newPassword) {
  const { data: passwordData, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);

  return passwordData;
}

// FORGOT PASSWORD

export async function sendRecoveryPass(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  console.log('apiAuth:', email);

  if (error) throw new Error(error.message);

  return data;
}
