import { Badge } from "@/components/ui/badge";
import { PickupRequest } from "@/data/types";
import { WASTE_CATEGORIES } from "@/data/mockData";

const statusColors: Record<string, string> = {
  pending: "bg-eco-gold/20 text-eco-earth border-eco-gold/40",
  approved: "bg-primary/10 text-primary border-primary/30",
  completed: "bg-eco-leaf/20 text-eco-leaf border-eco-leaf/40",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
};

const RequestCard = ({ request }: { request: PickupRequest }) => {
  const cat = WASTE_CATEGORIES.find((c) => c.id === request.category);
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:shadow-card">
      <span className="text-2xl">{cat?.icon ?? "♻️"}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{cat?.name} — {request.description || "Pickup request"}</p>
        <p className="text-sm text-muted-foreground">{request.address}</p>
        <p className="text-xs text-muted-foreground">{request.scheduledDate} at {request.scheduledTime}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusColors[request.status]}`}>
          {request.status}
        </span>
        <span className="text-xs font-medium text-primary">+{request.points} pts</span>
      </div>
    </div>
  );
};

export default RequestCard;
