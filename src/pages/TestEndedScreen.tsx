import chiliImage from "@/assets/chili-transparent.png";

const TestEndedScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#2d1b4e] via-[#4a3370] to-[#2d1b4e] px-8 text-center">
      {/* Logo piment */}
      <div className="mb-8 opacity-80">
        <img 
          src={chiliImage} 
          alt="MODERA" 
          className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(255,100,150,0.4)]"
        />
      </div>

      {/* Titre */}
      <span className="modera-title">
        <h1 className="text-6xl italic text-pink-200 mb-6" style={{ fontFamily: "'Mrs Saint Delafield', cursive", textShadow: "0 0 10px #ff6b9d, 0 0 20px #ff6b9d" }}>
          Modera
        </h1>
      </span>

      {/* Message principal */}
      <div className="max-w-sm space-y-4">
        <p className="text-pink-100/90 text-lg leading-relaxed">
          Merci d'avoir testé MODERA pendant ces 48 heures.
        </p>
        <p className="text-pink-200/70 text-base leading-relaxed">
          Cette phase de test est maintenant terminée.
        </p>
        <p className="text-pink-300/60 text-sm mt-8 italic">
          À très bientôt pour la suite de l'aventure...
        </p>
      </div>

      {/* Effet décoratif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default TestEndedScreen;
