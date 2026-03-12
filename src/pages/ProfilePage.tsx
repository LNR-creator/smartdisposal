import { motion } from "framer-motion";
import { User, Mail, Calendar, Trophy, Recycle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { getPickupRequests } from "@/data/mockData";
import RequestCard from "@/components/RequestCard";

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  const requests = getPickupRequests("user1");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-hero text-3xl font-bold text-primary-foreground">
              {user?.name?.charAt(0)}
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">{user?.name}</h1>
            <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" /> {user?.email}
            </p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> Joined {user?.joinedDate}
            </p>
            <div className="mt-6 flex justify-center gap-8">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">{user?.points}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Trophy className="h-3 w-3" /> Points</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-eco-leaf">{user?.totalDisposals}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Recycle className="h-3 w-3" /> Disposals</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-eco-gold">#{user?.rank}</p>
                <p className="text-xs text-muted-foreground">Rank</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8">
          <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Your Disposal History</h2>
          <div className="space-y-3">
            {requests.map(r => <RequestCard key={r.id} request={r} />)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
