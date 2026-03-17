import { supabase } from './api/client';
import { TABLES } from './api/endpoints';

export interface User {
  id?: string;
  email: string;
  name: string;
  role: string;
  // Add other fields as needed
}

export const getUsers = async () => {
  const { data, error } = await supabase.from(TABLES.USERS).select('*');

  if (error) throw error;
  return data;
};

export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from(TABLES.USERS)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const getCurrentUserProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  return getUserById(user.id);
};

export const updateUser = async (id: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from(TABLES.USERS)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteUser = async (id: string) => {
  const { error } = await supabase.from(TABLES.USERS).delete().eq('id', id);

  if (error) throw error;
};
