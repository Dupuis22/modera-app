import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "modera-consumptions";

type ConsumptionData = Record<string, number>;

const getDateKey = (date: Date = new Date()): string => {
  return date.toISOString().slice(0, 10);
};

export const useConsumptions = () => {
  const [data, setData] = useState<ConsumptionData>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const save = (newData: ConsumptionData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setData(newData);
  };

  const addOne = useCallback(() => {
    const key = getDateKey();
    const newData = { ...data, [key]: (data[key] || 0) + 1 };
    save(newData);
  }, [data]);

  const getTodayCount = (): number => {
    return data[getDateKey()] || 0;
  };

  const getYesterdayCount = (): number => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return data[getDateKey(yesterday)] || 0;
  };

  const shouldShowAlert = (): boolean => {
    const today = getTodayCount();
    const yesterday = getYesterdayCount();
    if (today === 0 || yesterday === 0) return false;
    // Alerte si +50% ou +3 de plus qu'hier
    return today > yesterday * 1.5 || today >= yesterday + 3;
  };

  return {
    addOne,
    getTodayCount,
    getYesterdayCount,
    shouldShowAlert,
  };
};
