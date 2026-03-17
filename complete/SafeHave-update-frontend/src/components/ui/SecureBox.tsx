import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface SecureBoxProps {
  children: React.ReactNode;
  className?: string;
  showSecurityIndicator?: boolean;
}

export const SecureBox: React.FC<SecureBoxProps> = ({
  children,
  className = '',
  showSecurityIndicator = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-[48px] border-2 border-slate-200 bg-white shadow-xl backdrop-blur-2xl dark:border-slate-800/50 dark:bg-slate-900/40 ${className} `}
    >
      {/* Inner subtle glow */}
      <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-[#FDFDF5]/50 to-[#6B705C]/30 dark:from-[#FDFDF5]/5 dark:to-[#6B705C]/5" />

      {/* Security indicator */}
      {showSecurityIndicator && (
        <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <Lock className="h-3 w-3 text-emerald-700 dark:text-emerald-400" />
          <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-400">
            Secure
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
