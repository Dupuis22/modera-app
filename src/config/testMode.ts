// ========== CONTRÔLE DU MODE TEST ==========
// Pour DÉBLOQUER l'application : mettre TEST_MODE_ENABLED à false
export const TEST_MODE_ENABLED = false;

// Date/heure de fin du test (20 janvier 2026 à 10h00)
export const TEST_END_DATE = new Date('2026-01-20T10:00:00');
// ============================================

export const isTestEnded = (): boolean => {
  if (!TEST_MODE_ENABLED) return false;
  return new Date() >= TEST_END_DATE;
};
