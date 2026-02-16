import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePurchases } from "@/hooks/usePurchases";
import BottomNav from "@/components/BottomNav";

const AddPurchase = () => {
  const navigate = useNavigate();
  const { addPurchase } = usePurchases();
  const [text, setText] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return;
    addPurchase(text.trim());
    setShowSuccess(true);
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#4a3370] to-[#2d1b4e]" />
      <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full opacity-20 animate-pulse" style={{ background: "radial-gradient(circle, #ff6b9d 0%, transparent 60%)" }} />
      <div className="absolute bottom-40 left-1/4 w-56 h-56 rounded-full opacity-15 animate-pulse" style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 60%)", animationDelay: "2s" }} />

      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#2d1b4e]/95 backdrop-blur-sm z-50 flex items-center justify-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.4 }} className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", bounce: 0.5 }} className="w-20 h-20 mx-auto mb-6 rounded-full bg-pink-500/20 flex items-center justify-center">
                <span className="text-4xl">🌶️</span>
              </motion.div>
              <h2 className="text-xl text-white mb-2 font-light">Achat enregistré</h2>
              <p className="text-white/50 text-sm">Modifiable pendant 12 heures</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-8">
        <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-2xl font-light tracking-[0.2em] text-pink-300 mb-1" style={{ fontFamily: "'Inter', sans-serif", textShadow: "0 0 10px #ff6b9d, 0 0 20px #ff6b9d" }}>MODERA</h1>
          <p className="text-white/40 text-sm">Noter un achat</p>
        </motion.header>

        <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="bg-white/[0.05] backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <label className="text-sm text-white/50 mb-3 block">Décris ton achat</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ex: 2g CBD Amnesia, 1 boîte de chocolats..."
              maxLength={200}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400/50 resize-none transition-all"
              autoFocus
            />
            <p className="text-white/30 text-xs mt-2">Cet achat sera supprimable pendant 12 heures</p>
          </div>
        </motion.main>

        <motion.footer initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
          <motion.button whileTap={{ scale: text.trim() ? 0.98 : 1 }} onClick={handleSubmit} disabled={!text.trim()} className={`w-full py-4 px-6 rounded-2xl font-medium text-base transition-all ${text.trim() ? "bg-pink-500/90 text-white shadow-lg shadow-pink-500/30 hover:bg-pink-500" : "bg-white/10 text-white/30 cursor-not-allowed"}`}>
            Valider
          </motion.button>
        </motion.footer>

        <motion.p className="text-white/20 text-xs text-center mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          💚 Chaque ressenti est personnel, sans jugement
        </motion.p>
      </div>

      <BottomNav />
    </div>
  );
};

export default AddPurchase;
