import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Suivi", icon: "◉" },
    { path: "/ajouter", label: "Ajouter", icon: "+" },
    { path: "/parametres", label: "Réglages", icon: "⚙" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#2d1b4e]/90 backdrop-blur-lg border-t border-white/10 px-6 py-3 z-40">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center gap-1 px-6 py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-pink-500/20 rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span
                className={`text-xl transition-colors relative z-10 ${
                  isActive ? "text-pink-400" : "text-white/40"
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`text-xs font-medium transition-colors relative z-10 ${
                  isActive ? "text-pink-400" : "text-white/40"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
