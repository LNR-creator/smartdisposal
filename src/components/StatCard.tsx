import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  color?: string;
  delay?: number;
}

const StatCard = ({ icon, label, value, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    className="rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-elevated"
  >
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
      {icon}
    </div>
    <p className="text-2xl font-bold font-display text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </motion.div>
);

export default StatCard;
