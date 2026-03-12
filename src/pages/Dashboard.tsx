import { motion } from "framer-motion";
import { Recycle, Leaf, Trophy, Truck, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import RequestCard from "@/components/RequestCard";
import { useAuth } from "@/hooks/useAuth";
import { getPickupRequests, RECYCLING_CENTERS, WASTE_CATEGORIES } from "@/data/mockData";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  const requests = getPickupRequests("user1");
  const completed = requests.filter(r => r.status === "completed").length;
  const pending = requests.filter(r => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Welcome back, {user?.name?.split(" ")[0]}! 🌿
          </h1>
          <p className="mt-1 text-muted-foreground">Here's your eco-impact overview</p>
        </motion.div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<Trophy className="h-5 w-5 text-eco-gold" />} label="Eco Points" value={user?.points ?? 0} delay={0} />
          <StatCard icon={<Recycle className="h-5 w-5 text-primary" />} label="Total Disposals" value={user?.totalDisposals ?? 0} delay={0.1} />
          <StatCard icon={<Truck className="h-5 w-5 text-eco-sky" />} label="Pending Pickups" value={pending} delay={0.2} />
          <StatCard icon={<Leaf className="h-5 w-5 text-eco-leaf" />} label="Completed" value={completed} delay={0.3} />
        </div>

        {/* Quick actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/schedule"><Button variant="hero">Schedule Pickup</Button></Link>
          <Link to="/guide"><Button variant="outline">Recycling Guide</Button></Link>
          <Link to="/rewards"><Button variant="outline">View Rewards</Button></Link>
        </div>

        {/* Recent requests */}
        <div className="mt-10">
          <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Recent Pickup Requests</h2>
          <div className="space-y-3">
            {requests.slice(0, 5).map(r => (
              <RequestCard key={r.id} request={r} />
            ))}
          </div>
        </div>

        {/* Nearby centers */}
        <div className="mt-10">
          <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Nearby Recycling Centers</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {RECYCLING_CENTERS.slice(0, 4).map((center, i) => (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <h3 className="font-display font-semibold text-foreground">{center.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {center.address}
                </p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {center.hours}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {center.categories.map(catId => {
                    const cat = WASTE_CATEGORIES.find(c => c.id === catId);
                    return cat ? (
                      <span key={catId} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        {cat.icon} {cat.name}
                      </span>
                    ) : null;
                  })}
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

export default Dashboard;
