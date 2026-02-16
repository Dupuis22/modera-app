// Types de module virtuel fournis par vite-plugin-pwa.
// (Ajout local pour s'assurer que TypeScript les détecte bien dans ce projet.)
declare module "virtual:pwa-register" {
  import type { RegisterSWOptions } from "vite-plugin-pwa/types";

  export type { RegisterSWOptions };

  export function registerSW(
    options?: RegisterSWOptions,
  ): (reloadPage?: boolean) => Promise<void>;
}
