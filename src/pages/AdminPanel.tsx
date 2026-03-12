import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Eye, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getPickupRequests, updateRequestStatus, WASTE_CATEGORIES } from "@/data/mockData";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { PickupRequest } from "@/data/types";

const statusColors: Record<string, string> = {
  pending: "bg-eco-gold/20 text-eco-earth border-eco-gold/40",
  approved: "bg-primary/10 text-primary border-primary/30",
  completed: "bg-eco-leaf/20 text-eco-leaf border-eco-leaf/40",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
};

const AdminPanel = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [filter, setFilter] = useState<string>("all");
  const [, setRefresh] = useState(0);

  if (!isAuthenticated || !isAdmin) return <Navigate to="/login" />;

  const allRequests = getPickupRequests();
  const filtered = filter === "all" ? allRequests : allRequests.filter(r => r.status === filter);

  const handleAction = (id: string, status: PickupRequest["status"]) => {
    updateRequestStatus(id, status);
    setRefresh(n => n + 1);
    toast.success(`Request ${status}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground">🛡️ Admin Panel</h1>
          <p className="mt-1 text-muted-foreground">Manage all pickup requests</p>
        </motion.div>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap gap-3">
          {["all", "pending", "approved", "completed", "rejected"].map(s => (
            <Button
              key={s}
              variant={filter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(s)}
              className="capitalize"
            >
              {s} ({s === "all" ? allRequests.length : allRequests.filter(r => r.status === s).length})
            </Button>
          ))}
        </div>

        {/* Requests */}
        <div className="mt-6 space-y-3">
          {filtered.map((req, i) => {
            const cat = WASTE_CATEGORIES.find(c => c.id === req.category);
            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-2xl">{cat?.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{cat?.name} — {req.description || "Pickup"}</p>
                    <p className="text-sm text-muted-foreground">{req.address}</p>
                    <p className="text-xs text-muted-foreground">{req.scheduledDate} at {req.scheduledTime} • User: {req.userId}</p>
                  </div>
                  <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[req.status]}`}>
                    {req.status}
                  </span>
                </div>
                {req.status === "pending" && (
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="default" className="gap-1.5" onClick={() => handleAction(req.id, "approved")}>
                      <Check className="h-3.5 w-3.5" /> Approve
                    </Button>
                    <Button size="sm" variant="destructive" className="gap-1.5" onClick={() => handleAction(req.id, "rejected")}>
                      <X className="h-3.5 w-3.5" /> Reject
                    </Button>
                  </div>
                )}
                {req.status === "approved" && (
                  <div className="mt-4">
                    <Button size="sm" variant="default" className="gap-1.5" onClick={() => handleAction(req.id, "completed")}>
                      <Truck className="h-3.5 w-3.5" /> Mark Completed
                    </Button>
                  </div>
                )}
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-muted-foreground">No requests found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
