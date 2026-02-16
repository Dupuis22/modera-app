import { useState, useEffect } from 'react';

export interface UserProfile {
  pseudo: string;
  pin?: string;
  createdAt: string;
}

const STORAGE_KEY = 'modera_user';

export const useUser = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as UserProfile;
        setUser(parsed);
        // Si PIN défini, l'app est verrouillée au démarrage
        if (parsed.pin) {
          setIsLocked(true);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const createUser = (pseudo: string, pin?: string) => {
    const newUser: UserProfile = {
      pseudo: pseudo.trim(),
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

  return {
    user,
    isLoading,
    isLocked,
    isOnboarded: !!user,
    createUser,
    verifyPin,
    unlock,
    deleteUser,
  };
};
