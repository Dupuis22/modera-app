import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { isTestEnded } from "@/config/testMode";
import Index from "./pages/Index";
import AddPurchase from "./pages/AddPurchase";
import Onboarding from "./pages/Onboarding";
import LockScreen from "./pages/LockScreen";
import Settings from "./pages/Settings";
import QRCodePage from "./pages/QRCode";
import TestEndedScreen from "./pages/TestEndedScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Composant pour gérer les routes protégées
const ProtectedRoutes = () => {
  const { isLoading, isOnboarded, isLocked } = useUser();

  // Vérification du mode test AVANT tout le reste
  if (isTestEnded()) {
    return <TestEndedScreen />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#2d1b4e] via-[#4a3370] to-[#2d1b4e]">
        <div className="text-pink-300 text-xl tracking-widest animate-pulse">MODERA</div>
      </div>
    );
  }

  // Pas encore onboardé → onboarding
  if (!isOnboarded) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  // Onboardé mais verrouillé → écran de déverrouillage
  if (isLocked) {
    return <LockScreen />;
  }

  // Onboardé et déverrouillé → app normale
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/ajouter" element={<AddPurchase />} />
      <Route path="/parametres" element={<Settings />} />
      <Route path="/qr" element={<QRCodePage />} />
      <Route path="/onboarding" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// App component with providers
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ProtectedRoutes />
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
