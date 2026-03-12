import { motion } from "framer-motion";
import { Lightbulb, TreePine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WASTE_GUIDES } from "@/data/mockData";
import { useState } from "react";

const GuidePage = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground">♻️ Recycling Guide</h1>
          <p className="mt-1 text-muted-foreground">Learn how to properly dispose of each waste type</p>
        </motion.div>

        <div className="mt-8 space-y-4">
          {WASTE_GUIDES.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card shadow-card overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === guide.id ? null : guide.id)}
                className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-muted/30"
              >
                <span className="text-3xl">{guide.icon}</span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-foreground">{guide.category}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{guide.howTo}</p>
                </div>
                <span className="text-muted-foreground transition-transform duration-200" style={{ transform: expanded === guide.id ? "rotate(180deg)" : "" }}>▼</span>
              </button>
              {expanded === guide.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="border-t border-border bg-muted/20 p-5"
                >
                  <div className="mb-4">
                    <h4 className="mb-2 flex items-center gap-2 font-display font-semibold text-foreground">
                      <Lightbulb className="h-4 w-4 text-eco-gold" /> How to Dispose
                    </h4>
                    <p className="text-sm text-muted-foreground">{guide.howTo}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="mb-2 font-display font-semibold text-foreground">Tips</h4>
                    <ul className="space-y-1.5">
                      {guide.tips.map((tip, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-0.5 text-primary">•</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-secondary p-3">
                    <p className="flex items-center gap-2 text-sm font-medium text-secondary-foreground">
                      <TreePine className="h-4 w-4 text-eco-leaf" /> {guide.impact}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GuidePage;
