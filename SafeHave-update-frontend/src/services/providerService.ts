import { supabase } from './api/client';
import { TABLES } from './api/endpoints';

export interface Provider {
  id?: string;
  name: string;
  type: string;
  contact: string;
  // Add other fields as needed
}

export const getProviders = async () => {
  const { data, error } = await supabase.from(TABLES.PROVIDERS).select('*');

  if (error) throw error;
  return data;
};

export const getProviderById = async (id: string) => {
  const { data, error } = await supabase
    .from(TABLES.PROVIDERS)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const createProvider = async (provider: Omit<Provider, 'id'>) => {
  const { data, error } = await supabase
    .from(TABLES.PROVIDERS)
    .insert(provider)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProvider = async (
  id: string,
  updates: Partial<Provider>
) => {
  const { data, error } = await supabase
    .from(TABLES.PROVIDERS)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteProvider = async (id: string) => {
  const { error } = await supabase.from(TABLES.PROVIDERS).delete().eq('id', id);

  if (error) throw error;
};
