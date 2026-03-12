import { motion } from "framer-motion";
import { WASTE_CATEGORIES } from "@/data/mockData";

interface CategoryPickerProps {
  selected: string;
  onSelect: (id: string) => void;
}

const CategoryPicker = ({ selected, onSelect }: CategoryPickerProps) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
    {WASTE_CATEGORIES.map((cat, i) => (
      <motion.button
        key={cat.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.05 }}
        onClick={() => onSelect(cat.id)}
        className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
          selected === cat.id
            ? "border-primary bg-secondary shadow-card"
            : "border-border bg-card hover:border-primary/40"
        }`}
      >
        <span className="text-3xl">{cat.icon}</span>
        <span className="text-sm font-medium text-foreground">{cat.name}</span>
        <span className="text-xs text-muted-foreground">+{cat.points} pts</span>
      </motion.button>
    ))}
  </div>
);

export default CategoryPicker;
