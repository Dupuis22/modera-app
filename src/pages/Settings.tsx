import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { ArrowLeft, User, Lock, Trash2, RefreshCw, Info, Check, X, Download, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const PURCHASES_STORAGE_KEY = "modera-purchases";
const CONSUMPTIONS_STORAGE_KEY = "modera-consumptions";

const Settings = () => {
  const navigate = useNavigate();
  const { user, updatePin, deleteUser } = useUser();
  const { toast } = useToast();
  
  const [isEditingPin, setIsEditingPin] = useState(false);
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinAction, setPinAction] = useState<"add" | "change" | "remove">("add");
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);

  const hasPin = !!user?.pin;

  const handleCheckUpdate = async () => {
    setIsCheckingUpdate(true);
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'CHECK_UPDATE' });
      }
      setTimeout(() => {
        setIsCheckingUpdate(false);
        toast({ title: "Vérification terminée", description: "Si une mise à jour existe, un toast apparaîtra." });
      }, 2000);
    } catch {
      setIsCheckingUpdate(false);
      toast({ title: "Erreur", description: "Impossible de vérifier les mises à jour.", variant: "destructive" });
    }
  };

  const handleForceReload = () => {
    window.location.href = window.location.origin + `?v=${Date.now()}`;
  };

  const handlePinAction = () => {
    if (hasPin && (pinAction === "change" || pinAction === "remove")) {
      if (currentPin !== user?.pin) {
        toast({ title: "Code incorrect", description: "Le code PIN actuel est incorrect.", variant: "destructive" });
        return;
      }
    }
    if (pinAction === "remove") {
      updatePin(undefined);
      resetPinForm();
      toast({ title: "Code PIN désactivé", description: "L'application n'est plus protégée par un code." });
      return;
    }
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      toast({ title: "Code invalide", description: "Le code PIN doit contenir exactement 4 chiffres.", variant: "destructive" });
      return;
    }
    if (newPin !== confirmPin) {
      toast({ title: "Les codes ne correspondent pas", description: "Vérifie que les deux codes sont identiques.", variant: "destructive" });
      return;
    }
    updatePin(newPin);
    resetPinForm();
    toast({ title: pinAction === "add" ? "Code PIN activé" : "Code PIN modifié", description: "Ton nouveau code PIN est maintenant actif." });
  };

  const resetPinForm = () => {
    setIsEditingPin(false);
    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
  };

  const handleResetApp = () => {
    localStorage.removeItem(PURCHASES_STORAGE_KEY);
    localStorage.removeItem(CONSUMPTIONS_STORAGE_KEY);
    deleteUser();
    navigate("/onboarding");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d1b4e] via-[#4a3370] to-[#2d1b4e] text-white pb-8">
      <header className="sticky top-0 z-50 bg-[#2d1b4e]/90 backdrop-blur-lg border-b border-white/10" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10 transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-xl font-bold tracking-wide">Paramètres</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profil */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-pink-500/20"><User className="w-5 h-5 text-pink-400" /></div>
            <h2 className="text-lg font-semibold">Profil</h2>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-white/60 text-sm">Pseudo</p>
              <p className="text-lg font-medium">{user?.pseudo}</p>
              <p className="text-white/30 text-xs mt-1">Verrouillé après l'inscription</p>
            </div>
            <div>
              <p className="text-white/60 text-sm">Plaisir suivi</p>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <p className="text-lg font-medium">{user?.plaisir || "—"}</p>
              </div>
              <p className="text-white/30 text-xs mt-1">Défini à l'inscription</p>
            </div>
          </div>
        </motion.section>

        {/* Sécurité */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-purple-500/20"><Lock className="w-5 h-5 text-purple-400" /></div>
            <h2 className="text-lg font-semibold">Sécurité</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Code PIN</p>
                <p className="text-lg font-medium">{hasPin ? "Activé (****)" : "Non configuré"}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${hasPin ? "bg-green-400" : "bg-white/30"}`} />
            </div>
            <AnimatePresence mode="wait">
              {isEditingPin ? (
                <motion.div key="editing-pin" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden">
                  {hasPin && pinAction !== "add" && (
                    <Input type="password" inputMode="numeric" maxLength={4} value={currentPin} onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ""))} placeholder="Code PIN actuel" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
                  )}
                  {pinAction !== "remove" && (
                    <>
                      <Input type="password" inputMode="numeric" maxLength={4} value={newPin} onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))} placeholder="Nouveau code PIN (4 chiffres)" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
                      <Input type="password" inputMode="numeric" maxLength={4} value={confirmPin} onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))} placeholder="Confirmer le code PIN" className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
                    </>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={handlePinAction} size="sm" className={`flex-1 ${pinAction === "remove" ? "bg-red-500 hover:bg-red-600" : "bg-purple-500 hover:bg-purple-600"}`}><Check className="w-4 h-4 mr-1" />{pinAction === "remove" ? "Désactiver" : "Confirmer"}</Button>
                    <Button onClick={resetPinForm} size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10"><X className="w-4 h-4" /></Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="pin-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-2">
                  {hasPin ? (
                    <>
                      <Button onClick={() => { setPinAction("change"); setIsEditingPin(true); }} variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">Modifier</Button>
                      <Button onClick={() => { setPinAction("remove"); setIsEditingPin(true); }} variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">Désactiver</Button>
                    </>
                  ) : (
                    <Button onClick={() => { setPinAction("add"); setIsEditingPin(true); }} variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">Ajouter un code PIN</Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Données */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-red-500/20"><Trash2 className="w-5 h-5 text-red-400" /></div>
            <h2 className="text-lg font-semibold">Données</h2>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"><RefreshCw className="w-4 h-4 mr-3" />Réinitialiser l'application</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#2d1b4e] border-white/20 text-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Réinitialiser complètement ?</AlertDialogTitle>
                <AlertDialogDescription className="text-white/60">Cette action supprimera TOUTES tes données : pseudo, code PIN, achats et consommations.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20">Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetApp} className="bg-red-500 hover:bg-red-600">Réinitialiser</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.section>

        {/* Informations */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-blue-500/20"><Info className="w-5 h-5 text-blue-400" /></div>
            <h2 className="text-lg font-semibold">Informations</h2>
          </div>
          <Button onClick={handleCheckUpdate} disabled={isCheckingUpdate} variant="ghost" className="w-full justify-start text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 mb-2">
            <Download className={`w-4 h-4 mr-3 ${isCheckingUpdate ? "animate-spin" : ""}`} />{isCheckingUpdate ? "Vérification en cours..." : "Vérifier les mises à jour"}
          </Button>
          <Button onClick={handleForceReload} variant="ghost" className="w-full justify-start text-white/60 hover:text-white hover:bg-white/10 mb-4"><RefreshCw className="w-4 h-4 mr-3" />Forcer le rechargement</Button>
          <div className="space-y-2 text-white/60 text-sm">
            <div className="flex justify-between"><span>Version</span><span className="text-white font-mono">2.0.0</span></div>
            {user?.createdAt && <div className="flex justify-between"><span>Profil créé le</span><span>{formatDate(user.createdAt)}</span></div>}
            <div className="flex justify-between"><span>Stockage</span><span>Local uniquement</span></div>
          </div>
          <p className="mt-4 text-xs text-white/40 text-center">Tes données restent sur ton appareil et ne sont jamais partagées.</p>
        </motion.section>
      </div>
    </div>
  );
};

export default Settings;
