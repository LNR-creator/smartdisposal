import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, FileText, Send, ImagePlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryPicker from "@/components/CategoryPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { addPickupRequest } from "@/data/mockData";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SchedulePickup = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !address.trim() || !date || !time) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (address.length > 200) {
      toast.error("Address must be less than 200 characters");
      return;
    }
    addPickupRequest({
      userId: "user1",
      category,
      address: address.trim(),
      scheduledDate: date,
      scheduledTime: time,
      description: description.trim(),
    });
    toast.success("Pickup request submitted! 🎉");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground">Schedule a Pickup</h1>
          <p className="mt-1 text-muted-foreground">Request a waste pickup from your location</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <Label className="mb-3 block text-base font-semibold">Waste Category *</Label>
            <CategoryPicker selected={category} onSelect={setCategory} />
          </div>

          <div>
            <Label htmlFor="address">Pickup Address *</Label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Green St, Eco City" className="pl-10" maxLength={200} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="date">Pickup Date *</Label>
              <div className="relative mt-1.5">
                <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="time">Pickup Time *</Label>
              <div className="relative mt-1.5">
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} className="pl-10" />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <div className="relative mt-1.5">
              <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the waste items..." maxLength={500} rows={3} />
            </div>
          </div>

          <div>
            <Label>Upload Waste Image</Label>
            <div className="mt-1.5">
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 transition-colors hover:border-primary/40">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="h-32 w-32 rounded-lg object-cover" />
                ) : (
                  <>
                    <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload an image</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full gap-2">
            <Send className="h-4 w-4" /> Submit Request
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SchedulePickup;
