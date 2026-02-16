import { useState, useEffect } from "react";
import { Purchase, CORRECTION_WINDOW_HOURS } from "@/types/purchase";

const STORAGE_KEY = "modera-purchases";

export const usePurchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const migrated = parsed.map((p: any) => ({
        id: p.id,
        text: p.text || p.quantity || "",
        createdAt: new Date(p.createdAt),
      }));
      setPurchases(migrated);
    }
  }, []);

  const savePurchases = (newPurchases: Purchase[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPurchases));
    setPurchases(newPurchases);
  };

  const addPurchase = (text: string) => {
    const now = new Date();
    const newPurchase: Purchase = {
      id: crypto.randomUUID(),
      text,
      createdAt: now,
    };
    savePurchases([newPurchase, ...purchases]);
    return newPurchase;
  };

  const canEditPurchase = (purchase: Purchase): boolean => {
    const createdAt = new Date(purchase.createdAt).getTime();
    const now = Date.now();
    const windowMs = CORRECTION_WINDOW_HOURS * 60 * 60 * 1000;
    return now - createdAt < windowMs;
  };

  const getRemainingEditTime = (purchase: Purchase): string => {
    const createdAt = new Date(purchase.createdAt).getTime();
    const now = Date.now();
    const windowMs = CORRECTION_WINDOW_HOURS * 60 * 60 * 1000;
    const remainingMs = windowMs - (now - createdAt);
    if (remainingMs <= 0) return "";
    const hours = Math.floor(remainingMs / 3600000);
    const minutes = Math.ceil((remainingMs % 3600000) / 60000);
    if (hours > 0) return `${hours}h${minutes > 0 ? `${minutes.toString().padStart(2, '0')}` : ''}`;
    return `${minutes} min`;
  };

  const deletePurchase = (id: string) => {
    const purchase = purchases.find(p => p.id === id);
    if (!purchase || !canEditPurchase(purchase)) return false;
    savePurchases(purchases.filter(p => p.id !== id));
    return true;
  };

  const formatDate = (purchase: Purchase): string => {
    const now = new Date();
    const created = new Date(purchase.createdAt);
    const diffDays = Math.floor((now.getTime() - created.getTime()) / (24 * 60 * 60 * 1000));
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return created.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return {
    purchases,
    addPurchase,
    deletePurchase,
    canEditPurchase,
    getRemainingEditTime,
    formatDate,
  };
};
