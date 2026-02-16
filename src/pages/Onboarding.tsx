import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import chiliImage from "@/assets/chili-transparent.png";

const Onboarding = () => {
  const [step, setStep] = useState<'welcome' | 'pseudo' | 'plaisir' | 'pin' | 'done'>('welcome');
  const [pseudo, setPseudo] = useState('');
  const [plaisir, setPlaisir] = useState('');
  const [wantPin, setWantPin] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  
  const { createUser } = useUser();

  const handlePseudoSubmit = () => {
    if (pseudo.trim().length < 2) {
      setError('Au moins 2 caractères');
      return;
    }
    setError('');
    setStep('plaisir');
  };

  const handlePlaisirSubmit = () => {
    if (plaisir.trim().length < 2) {
      setError('Au moins 2 caractères');
      return;
    }
    setError('');
    setStep('pin');
  };

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) {
      document.getElementById(`pin-${index + 1}`)?.focus();
    }
  };

  const handleFinish = () => {
    const finalPin = wantPin ? pin.join('') : undefined;
    if (wantPin && finalPin && finalPin.length !== 4) {
      setError('Code PIN incomplet');
      return;
    }
    setStep('done');
    setTimeout(() => {
      createUser(pseudo, plaisir, finalPin);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#4a3370] to-[#2d1b4e]" />
      <div className="absolute top-20 left-1/3 w-80 h-80 rounded-full opacity-25 animate-pulse" style={{ background: "radial-gradient(circle, #ff6b9d 0%, transparent 60%)" }} />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full opacity-20 animate-pulse" style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 60%)", animationDelay: "2s" }} />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        <AnimatePresence mode="wait">
          {/* WELCOME */}
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center text-center">
              <motion.img src={chiliImage} alt="Modera" className="w-32 h-auto mb-8" initial={{ rotate: -10, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", duration: 0.8 }} style={{ filter: 'brightness(1.1) saturate(1.2)' }} />
              <span className="modera-title"><h1 className="text-6xl italic text-pink-300 mb-4" style={{ fontFamily: "'Mrs Saint Delafield', cursive", textShadow: "0 0 10px #ff6b9d, 0 0 20px #ff6b9d, 0 0 40px #ff6b9d" }}>Modera</h1></span>
              <p className="text-white/50 text-sm mb-12 font-light">Ton suivi, ton rythme, ta liberté.</p>
              <motion.button onClick={() => setStep('pseudo')} className="px-10 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium text-lg" whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }} whileTap={{ scale: 0.98 }}>Commencer</motion.button>
              <p className="text-white/25 text-xs mt-8 max-w-xs leading-relaxed">Aucune donnée personnelle n'est collectée. Tout reste sur ton téléphone.</p>
            </motion.div>
          )}

          {/* PSEUDO */}
          {step === 'pseudo' && (
            <motion.div key="pseudo" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center text-center w-full">
              <h2 className="text-2xl font-light text-white mb-2">Comment t'appeler ?</h2>
              <p className="text-white/40 text-sm mb-8">Un pseudo, un surnom... comme tu veux</p>
              <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} placeholder="Ton pseudo" maxLength={20} className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 text-white text-center text-lg placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all" autoFocus />
              {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
              <motion.button onClick={handlePseudoSubmit} disabled={!pseudo.trim()} className="mt-8 px-10 py-4 rounded-2xl bg-pink-500/80 text-white font-medium text-lg disabled:opacity-40 disabled:cursor-not-allowed" whileHover={{ scale: pseudo.trim() ? 1.02 : 1 }} whileTap={{ scale: pseudo.trim() ? 0.98 : 1 }}>Continuer</motion.button>
            </motion.div>
          )}

          {/* PLAISIR */}
          {step === 'plaisir' && (
            <motion.div key="plaisir" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center text-center w-full">
              <h2 className="text-2xl font-light text-white mb-2">Quel plaisir suivre ?</h2>
              <p className="text-white/40 text-sm mb-8">CBD, chocolat, cigarette... à toi de choisir</p>
              <input type="text" value={plaisir} onChange={(e) => setPlaisir(e.target.value)} placeholder="Ex: chocolat, CBD, café..." maxLength={30} className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 text-white text-center text-lg placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all" autoFocus />
              {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
              <motion.button onClick={handlePlaisirSubmit} disabled={!plaisir.trim()} className="mt-8 px-10 py-4 rounded-2xl bg-pink-500/80 text-white font-medium text-lg disabled:opacity-40 disabled:cursor-not-allowed" whileHover={{ scale: plaisir.trim() ? 1.02 : 1 }} whileTap={{ scale: plaisir.trim() ? 0.98 : 1 }}>Continuer</motion.button>
            </motion.div>
          )}

          {/* PIN */}
          {step === 'pin' && (
            <motion.div key="pin" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col items-center text-center w-full">
              <h2 className="text-2xl font-light text-white mb-2">Protéger l'accès ?</h2>
              <p className="text-white/40 text-sm mb-8">Un code PIN à 4 chiffres (optionnel)</p>
              <div className="flex gap-4 mb-6">
                <button onClick={() => setWantPin(false)} className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${!wantPin ? 'bg-white/20 text-white border border-white/30' : 'bg-white/5 text-white/50 border border-white/10'}`}>Non merci</button>
                <button onClick={() => setWantPin(true)} className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${wantPin ? 'bg-white/20 text-white border border-white/30' : 'bg-white/5 text-white/50 border border-white/10'}`}>Oui, avec PIN</button>
              </div>
              {wantPin && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex gap-3 mb-4">
                  {pin.map((digit, index) => (
                    <input key={index} id={`pin-${index}`} type="tel" inputMode="numeric" value={digit} onChange={(e) => handlePinChange(index, e.target.value)} maxLength={1} className="w-14 h-14 bg-white/10 border border-white/20 rounded-xl text-white text-center text-2xl focus:outline-none focus:ring-2 focus:ring-pink-400/50" />
                  ))}
                </motion.div>
              )}
              {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
              <motion.button onClick={handleFinish} className="mt-8 px-10 py-4 rounded-2xl bg-pink-500/80 text-white font-medium text-lg" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>C'est parti !</motion.button>
              <p className="text-white/20 text-xs mt-6 max-w-xs">⚠️ Si tu perds ton téléphone, tes données ne seront pas récupérables.</p>
            </motion.div>
          )}

          {/* DONE */}
          {step === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="text-6xl mb-6">🌶️</motion.div>
              <h2 className="text-2xl font-light text-white mb-2">Bienvenue, {pseudo} !</h2>
              <p className="text-white/40 text-sm">Ton espace est prêt...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
