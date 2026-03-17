import { supabase } from './api/client';
import { TABLES } from './api/endpoints';

export interface Message {
  id?: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  // Add other fields as needed
}

export const getMessages = async (userId?: string) => {
  let query = supabase.from(TABLES.MESSAGES).select('*');

  if (userId) {
    query = query.or(`senderId.eq.${userId},receiverId.eq.${userId}`);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

export const getMessageById = async (id: string) => {
  const { data, error } = await supabase
    .from(TABLES.MESSAGES)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const sendMessage = async (message: Omit<Message, 'id'>) => {
  const { data, error } = await supabase
    .from(TABLES.MESSAGES)
    .insert(message)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateMessage = async (id: string, updates: Partial<Message>) => {
  const { data, error } = await supabase
    .from(TABLES.MESSAGES)
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteMessage = async (id: string) => {
  const { error } = await supabase.from(TABLES.MESSAGES).delete().eq('id', id);

  if (error) throw error;
};
