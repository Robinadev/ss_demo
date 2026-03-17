import { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole } from '@/types/user';

interface User {
  name: string;
  email: string;
  role?: UserRole;
  isAnonymous?: boolean;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  chatbotOpen: boolean;
  setChatbotOpen: (open: boolean) => void;
  language: 'ENG' | 'AMH';
  setLanguage: (lang: 'ENG' | 'AMH') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('landing');
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [language, setLanguage] = useState<'ENG' | 'AMH'>('ENG');

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        currentPage,
        setCurrentPage,
        chatbotOpen,
        setChatbotOpen,
        language,
        setLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
