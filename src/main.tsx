import { registerSW } from "virtual:pwa-register";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Render app first, before any toast operations
createRoot(document.getElementById("root")!).render(<App />);

// PWA: enregistre le Service Worker avec gestion des mises à jour
// Import toast dynamically to avoid circular dependency
const setupPWA = async () => {
  const { toast } = await import("sonner");
  
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      toast("Mise à jour disponible", {
        description: "Une nouvelle version est prête.",
        action: {
          label: "Mettre à jour",
          onClick: () => {
            updateSW(true);
          },
        },
        duration: Infinity,
      });
    },
    onOfflineReady() {
      toast.success("App disponible hors-ligne", {
        duration: 3000,
      });
    },
  });

  // iOS: Vérifier les mises à jour quand l'app revient au premier plan
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      updateSW();
    }
  });

  // Vérification périodique toutes les 60 secondes
  setInterval(() => {
    updateSW();
  }, 60 * 1000);
};

setupPWA();
