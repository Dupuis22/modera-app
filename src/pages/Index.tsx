import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, AlertTriangle } from "lucide-react";
import { usePurchases } from "@/hooks/usePurchases";
import { useConsumptions } from "@/hooks/useConsumptions";
import { useUser } from "@/contexts/UserContext";
import PurchaseCard from "@/components/PurchaseCard";
import BottomNav from "@/components/BottomNav";
import chiliImage from "@/assets/chili-transparent.png";

const kindMessages = [
  "Tu prends soin de toi, c'est ce qui compte 💚",
  "N'oublie pas de bien t'hydrater aujourd'hui 💧",
  "Une pause pour respirer, ça fait du bien 🌿",
  "Écoute ton corps, il sait ce dont il a besoin ✨",
  "Prendre conscience, c'est déjà avancer 🌱",
  "Chaque pas compte, même les plus petits 🌸",
  "Accorde-toi un moment de douceur aujourd'hui 🫶",
  "Tu fais de ton mieux, et c'est suffisant 🌟",
  "Respire profondément, tu es exactement où tu dois être 🍃",
  "La bienveillance envers soi, c'est aussi du courage 💜",
  "Offre-toi une pause, tu la mérites 🌺",
  "Chaque journée est une nouvelle page à écrire ✍️",
  "Ton corps et toi, vous formez une belle équipe 🤝",
  "Pas de pression, juste de la présence 🧘",
  "Ce que tu ressens est valide, toujours 🌈",
];

const Index = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { purchases, deletePurchase, canEditPurchase, getRemainingEditTime, formatDate } = usePurchases();
  const { addOne, getTodayCount, shouldShowAlert } = useConsumptions();
  const [showDetails, setShowDetails] = useState(false);
  const [kindMessage] = useState(
    () => kindMessages[Math.floor(Math.random() * kindMessages.length)]
  );

  const todayCount = getTodayCount();
  const alertVisible = shouldShowAlert();

 const handleClickModera = () => {

  if (typeof window !== 'undefined' && (window as any).gtag) {

    (window as any).gtag('event', 'click_bouton_modera', {

      event_category: 'engagement',

      event_label: 'Bouton principal Modera'

    });

  }

} return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      {/* Fond cosmique */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#4a3370] to-[#2d1b4e]" />
      <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full opacity-20 animate-pulse" style={{ background: "radial-gradient(circle, #ff6b9d 0%, transparent 60%)" }} />
      <div className="absolute bottom-40 left-1/4 w-64 h-64 rounded-full opacity-15 animate-pulse" style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 60%)", animationDelay: "3s" }} />

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
          <span className="modera-title">
            <h1 className="text-6xl italic text-pink-300 mb-1 inline-flex items-center justify-center gap-2" style={{ fontFamily: "'Mrs Saint Delafield', cursive", textShadow: "0 0 10px #ff6b9d, 0 0 20px #ff6b9d, 0 0 40px #ff6b9d" }}>
              Modera
              <img src={chiliImage} alt="" className="w-8 h-8 object-contain select-none" style={{ filter: 'brightness(1.1) saturate(1.2)', position: 'relative', top: '8px' }} draggable={false} />
            </h1>
          </span>
          {user && <p className="text-white/40 text-sm">Salut {user.pseudo} 👋</p>}
        </motion.header>

        {/* Compteur du jour + bouton +1 */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/[0.07] backdrop-blur-sm rounded-2xl p-5 border border-white/10 mb-5 text-center">
          <p className="text-white/50 text-sm mb-1">
            {user?.plaisir ? `Consommations de ${user.plaisir} aujourd'hui` : "Consommations aujourd'hui"}
          </p>
          <p className="text-5xl font-light text-white mb-4">{todayCount}</p>
          <motion.button whileTap={{ scale: 0.95 }} onClick={()=> {
  window.gtag('event', 'clic_consommation');
  addOne();
}}
 } className="inline-flex items-center gap-2 px-8 py-3 bg-pink-500/80 text-white rounded-2xl font-medium text-base hover:bg-pink-500/90 transition-colors">
            <Plus size={20} />
            J'ai consommé
          </motion.button>
        </motion.div>

        {/* Alerte automatique */}
        <AnimatePresence>
          {alertVisible && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-white/70 text-sm">
                Tu as consommé un peu plus qu'hier. Prends un moment pour toi. 💛
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton ajouter un achat */}
        <motion.div className="mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <motion.button whileTap={{ scale: 0.98 }} onClick={() => navigate("/ajouter")} className="w-full px-4 py-3.5 bg-white/[0.07] border border-white/10 text-white/70 rounded-2xl font-medium text-sm hover:bg-white/10 transition-colors">
            📝 Ajouter un achat
          </motion.button>
        </motion.div>

        {/* Bannière philosophie */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-5 px-4 py-3 rounded-xl text-center" style={{ background: "linear-gradient(135deg, rgba(88, 66, 120, 0.6) 0%, rgba(68, 51, 102, 0.5) 100%)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <p className="text-white/70 font-medium text-xs mb-0.5">Ton équilibre, ton rythme.</p>
          <p className="text-white/40 text-[11px]">Modera t'accompagne, sans jamais juger.</p>
        </motion.div>

        {/* Message bienveillant */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-center mb-6">
          <p className="text-white/40 text-sm italic">
            {kindMessage}
          </p>
        </motion.div>

        {/* Toggle achats */}
        {purchases.length > 0 && (
          <motion.button onClick={() => setShowDetails(!showDetails)} className="w-full text-center text-white/40 text-sm mb-4 py-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            {showDetails ? "Masquer les achats ▲" : `Voir mes achats (${purchases.length}) ▼`}
          </motion.button>
        )}

        <AnimatePresence>
          {showDetails && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden space-y-3">
              {purchases.map(purchase => (
                <PurchaseCard
                  key={purchase.id}
                  purchase={purchase}
                  dateLabel={formatDate(purchase)}
                  canEdit={canEditPurchase(purchase)}
                  remainingTime={getRemainingEditTime(purchase)}
                  onDelete={deletePurchase}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
