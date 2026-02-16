import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Purchase } from "@/types/purchase";

interface PurchaseCardProps {
  purchase: Purchase;
  dateLabel: string;
  canEdit: boolean;
  remainingTime: string;
  onDelete: (id: string) => void;
}

const PurchaseCard = ({ purchase, dateLabel, canEdit, remainingTime, onDelete }: PurchaseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="bg-white/[0.05] backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">📝</div>
      <div className="flex-1 min-w-0">
        <span className="text-white/90 text-sm font-medium line-clamp-2">{purchase.text}</span>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-white/40 text-xs">{dateLabel}</span>
          {canEdit && remainingTime && (
            <>
              <span className="text-white/20">•</span>
              <span className="text-white/40 text-xs italic">Supprimable encore {remainingTime}</span>
            </>
          )}
        </div>
      </div>
      {canEdit && (
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => onDelete(purchase.id)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors">
          <Trash2 size={14} />
        </motion.button>
      )}
    </motion.div>
  );
};

export default PurchaseCard;
