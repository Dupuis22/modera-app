import { motion } from "framer-motion";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";

const LockScreen = () => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const { verifyPin, user } = useUser();

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`lock-pin-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-verify when complete
    if (index === 3 && value) {
      const fullPin = [...newPin.slice(0, 3), value].join('');
      if (fullPin.length === 4) {
        setTimeout(() => {
          const success = verifyPin(fullPin);
          if (!success) {
            setError(true);
            setPin(['', '', '', '']);
            setTimeout(() => setError(false), 1000);
            document.getElementById('lock-pin-0')?.focus();
          }
        }, 100);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Fond cosmique */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d1b4e] via-[#4a3370] to-[#2d1b4e]" />
      
      {/* Lueur ambiante */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-20 animate-pulse"
        style={{ background: "radial-gradient(circle, #ff6b9d 0%, transparent 60%)" }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full">
        
        {/* Logo */}
        <span className="modera-title">
          <h1 
            className="text-6xl italic text-pink-300 mb-2"
            style={{ 
              fontFamily: "'Mrs Saint Delafield', cursive",
              textShadow: "0 0 10px #ff6b9d, 0 0 20px #ff6b9d"
            }}
          >
            Modera
          </h1>
        </span>

        <p className="text-white/40 text-sm mb-12">
          Salut {user?.pseudo} 👋
        </p>

        <h2 className="text-xl font-light text-white mb-6">Entre ton code PIN</h2>

        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex gap-3 mb-8"
        >
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`lock-pin-${index}`}
              type="tel"
              inputMode="numeric"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              maxLength={1}
              autoFocus={index === 0}
              className={`w-14 h-14 bg-white/10 border rounded-xl text-white text-center text-2xl focus:outline-none focus:ring-2 transition-all ${
                error 
                  ? 'border-red-400 focus:ring-red-400/50' 
                  : 'border-white/20 focus:ring-pink-400/50'
              }`}
            />
          ))}
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-300 text-sm"
          >
            Code incorrect
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default LockScreen;
