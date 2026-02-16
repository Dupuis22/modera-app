export interface Purchase {
  id: string;
  /** Texte libre décrivant l'achat */
  text: string;
  /** Date de la saisie */
  createdAt: Date;
}

/** Fenêtre de correction en heures */
export const CORRECTION_WINDOW_HOURS = 12;
