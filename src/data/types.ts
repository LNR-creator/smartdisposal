export interface WasteCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  points: number;
  description: string;
}

export interface PickupRequest {
  id: string;
  userId: string;
  category: string;
  address: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "pending" | "approved" | "rejected" | "completed";
  points: number;
  createdAt: string;
  description?: string;
  imageUrl?: string;
}

export interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  categories: string[];
  hours: string;
  phone: string;
}

export interface WasteGuide {
  id: string;
  category: string;
  icon: string;
  tips: string[];
  impact: string;
  howTo: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  points: number;
  totalDisposals: number;
  joinedDate: string;
  avatar: string;
  rank: number;
}
