import { motion } from "framer-motion";
import { Trophy, Medal, Star, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { leaderboard } from "@/data/mockData";
import { Navigate } from "react-router-dom";

const rankIcons = ["🥇", "🥈", "🥉"];

const RewardsPage = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  const milestones = [
    { points: 50, label: "Eco Starter", unlocked: (user?.points ?? 0) >= 50 },
    { points: 100, label: "Green Warrior", unlocked: (user?.points ?? 0) >= 100 },
    { points: 250, label: "Planet Saver", unlocked: (user?.points ?? 0) >= 250 },
    { points: 500, label: "Eco Legend", unlocked: (user?.points ?? 0) >= 500 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground">🏆 Rewards & Leaderboard</h1>
          <p className="mt-1 text-muted-foreground">Earn eco-points and climb the ranks</p>
        </motion.div>

        {/* Points summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 rounded-2xl bg-gradient-hero p-8 text-center shadow-elevated"
        >
          <Trophy className="mx-auto h-10 w-10 text-primary-foreground" />
          <p className="mt-3 font-display text-4xl font-bold text-primary-foreground">{user?.points}</p>
          <p className="text-primary-foreground/80">Eco Points Earned</p>
          <p className="mt-1 text-sm text-primary-foreground/60">Rank #{user?.rank} on leaderboard</p>
        </motion.div>

        {/* Milestones */}
        <div className="mt-10">
          <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Milestones</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-xl border p-5 text-center transition-all ${
                  m.unlocked
                    ? "border-primary bg-secondary shadow-card"
                    : "border-border bg-card opacity-60"
                }`}
              >
                <Star className={`mx-auto h-6 w-6 ${m.unlocked ? "text-eco-gold" : "text-muted-foreground"}`} />
                <p className="mt-2 font-display font-semibold text-foreground">{m.label}</p>
                <p className="text-sm text-muted-foreground">{m.points} points</p>
                {m.unlocked && <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Unlocked ✓</span>}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-10">
          <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Leaderboard</h2>
          <div className="space-y-2">
            {leaderboard.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
                  entry.id === user?.id
                    ? "border-primary bg-secondary shadow-card"
                    : "border-border bg-card"
                }`}
              >
                <span className="text-2xl">{i < 3 ? rankIcons[i] : `#${i + 1}`}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{entry.name} {entry.id === user?.id && "(You)"}</p>
                  <p className="text-sm text-muted-foreground">{entry.totalDisposals} disposals</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-primary">{entry.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RewardsPage;
