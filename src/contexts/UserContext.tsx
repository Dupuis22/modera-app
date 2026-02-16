import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  pseudo: string;
  plaisir: string;
  pin?: string;
  createdAt: string;
}

interface UserContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isLocked: boolean;
  isOnboarded: boolean;
  createUser: (pseudo: string, plaisir: string, pin?: string) => void;
  verifyPin: (inputPin: string) => boolean;
  unlock: () => void;
  deleteUser: () => void;
  updatePin: (newPin?: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'modera_user';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as UserProfile;
        // Migration: ajouter plaisir si absent
        if (!parsed.plaisir) {
          parsed.plaisir = 'CBD';
        }
        setUser(parsed);
        if (parsed.pin) {
          setIsLocked(true);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const createUser = (pseudo: string, plaisir: string, pin?: string) => {
    const newUser: UserProfile = {
      pseudo: pseudo.trim(),
      plaisir: plaisir.trim(),
      pin: pin || undefined,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    setIsLocked(false);
  };

  const verifyPin = (inputPin: string): boolean => {
    if (user?.pin && inputPin === user.pin) {
      setIsLocked(false);
      return true;
    }
    return false;
  };

  const unlock = () => setIsLocked(false);

  const deleteUser = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setIsLocked(false);
  };

  const updatePin = (newPin?: string) => {
    if (!user) return;
    const updatedUser: UserProfile = { ...user, pin: newPin };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isLocked,
        isOnboarded: !!user,
        createUser,
        verifyPin,
        unlock,
        deleteUser,
        updatePin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
