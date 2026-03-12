import { WasteCategory, PickupRequest, RecyclingCenter, WasteGuide, UserProfile } from "./types";

export const WASTE_CATEGORIES: WasteCategory[] = [
  { id: "plastic", name: "Plastic", icon: "🧴", color: "eco-sky", points: 10, description: "Bottles, containers, packaging" },
  { id: "ewaste", name: "E-Waste", icon: "📱", color: "eco-coral", points: 25, description: "Electronics, batteries, cables" },
  { id: "organic", name: "Organic", icon: "🍃", color: "eco-leaf", points: 5, description: "Food scraps, yard waste" },
  { id: "metal", name: "Metal", icon: "🔩", color: "eco-earth", points: 15, description: "Cans, foil, scrap metal" },
  { id: "glass", name: "Glass", icon: "🫙", color: "eco-gold", points: 12, description: "Bottles, jars, windows" },
];

export const RECYCLING_CENTERS: RecyclingCenter[] = [
  { id: "1", name: "GreenCycle Hub", address: "123 Eco Drive, Green City", lat: 40.7128, lng: -74.006, categories: ["plastic", "metal", "glass"], hours: "Mon-Sat 8AM-6PM", phone: "(555) 123-4567" },
  { id: "2", name: "EarthFirst Recycling", address: "456 Nature Blvd, Eco Town", lat: 40.7589, lng: -73.9851, categories: ["ewaste", "plastic"], hours: "Mon-Fri 9AM-5PM", phone: "(555) 234-5678" },
  { id: "3", name: "Clean Planet Center", address: "789 Sustainable St, Green Valley", lat: 40.7484, lng: -73.9857, categories: ["organic", "metal", "glass"], hours: "Daily 7AM-8PM", phone: "(555) 345-6789" },
  { id: "4", name: "Eco Warriors Station", address: "321 Recycle Rd, EcoVille", lat: 40.7614, lng: -73.9776, categories: ["plastic", "ewaste", "metal", "glass", "organic"], hours: "Mon-Sun 6AM-9PM", phone: "(555) 456-7890" },
];

export const WASTE_GUIDES: WasteGuide[] = [
  {
    id: "plastic",
    category: "Plastic",
    icon: "🧴",
    tips: ["Rinse containers before recycling", "Remove caps and labels when possible", "Check the recycling number on the bottom", "Avoid recycling plastic bags in bins"],
    impact: "Recycling one ton of plastic saves 7.4 cubic yards of landfill space",
    howTo: "Clean, sort by resin type, and place in designated recycling bins. Plastic bags should go to special drop-off points.",
  },
  {
    id: "ewaste",
    category: "E-Waste",
    icon: "📱",
    tips: ["Never throw electronics in regular trash", "Remove batteries before recycling", "Wipe personal data from devices", "Check for manufacturer take-back programs"],
    impact: "Recycling 1 million laptops saves energy equivalent to powering 3,657 homes for a year",
    howTo: "Take to certified e-waste recyclers. Many retailers offer free e-waste drop-off. Remove batteries and data storage devices.",
  },
  {
    id: "organic",
    category: "Organic Waste",
    icon: "🍃",
    tips: ["Compost at home if possible", "Separate food waste from packaging", "Use biodegradable bags", "Avoid composting meat or dairy"],
    impact: "Composting reduces methane emissions from landfills by up to 50%",
    howTo: "Separate food scraps and yard waste. Use a compost bin or municipal green bin. Keep meat and dairy out of home compost.",
  },
  {
    id: "metal",
    category: "Metal",
    icon: "🔩",
    tips: ["Crush cans to save space", "Separate aluminum from steel", "Clean food containers", "Include foil and pie plates"],
    impact: "Recycling aluminum saves 95% of the energy needed to make new aluminum",
    howTo: "Rinse food residue, crush if possible, and place in recycling. Scrap metal can be taken to metal recyclers for payment.",
  },
  {
    id: "glass",
    category: "Glass",
    icon: "🫙",
    tips: ["Rinse bottles and jars", "Remove metal lids", "Don't include broken glass in bins", "Sort by color if required"],
    impact: "Glass is 100% recyclable and can be recycled endlessly without loss of quality",
    howTo: "Rinse, remove lids, and place in glass recycling. Broken glass should be wrapped safely and disposed separately.",
  },
];

let mockPickupRequests: PickupRequest[] = [
  { id: "1", userId: "user1", category: "plastic", address: "123 Main St", scheduledDate: "2026-03-15", scheduledTime: "10:00 AM", status: "pending", points: 10, createdAt: "2026-03-10", description: "2 bags of plastic bottles" },
  { id: "2", userId: "user1", category: "ewaste", address: "123 Main St", scheduledDate: "2026-03-12", scheduledTime: "2:00 PM", status: "completed", points: 25, createdAt: "2026-03-08", description: "Old laptop and phone" },
  { id: "3", userId: "user2", category: "organic", address: "456 Oak Ave", scheduledDate: "2026-03-14", scheduledTime: "9:00 AM", status: "approved", points: 5, createdAt: "2026-03-09", description: "Yard waste and food scraps" },
  { id: "4", userId: "user1", category: "glass", address: "123 Main St", scheduledDate: "2026-03-11", scheduledTime: "11:00 AM", status: "completed", points: 12, createdAt: "2026-03-07", description: "Glass jars and bottles" },
];

export const mockUser: UserProfile = {
  id: "user1",
  name: "Alex Green",
  email: "alex@example.com",
  points: 247,
  totalDisposals: 18,
  joinedDate: "2025-11-15",
  avatar: "",
  rank: 3,
};

export const leaderboard: UserProfile[] = [
  { id: "u1", name: "Jordan Rivers", email: "", points: 520, totalDisposals: 42, joinedDate: "2025-06-01", avatar: "", rank: 1 },
  { id: "u2", name: "Sam Forrest", email: "", points: 385, totalDisposals: 31, joinedDate: "2025-08-15", avatar: "", rank: 2 },
  { ...mockUser, rank: 3 },
  { id: "u4", name: "Taylor Bloom", email: "", points: 198, totalDisposals: 14, joinedDate: "2025-12-01", avatar: "", rank: 4 },
  { id: "u5", name: "Casey Meadow", email: "", points: 156, totalDisposals: 11, joinedDate: "2026-01-10", avatar: "", rank: 5 },
];

export function getPickupRequests(userId?: string): PickupRequest[] {
  return userId ? mockPickupRequests.filter(r => r.userId === userId) : mockPickupRequests;
}

export function addPickupRequest(request: Omit<PickupRequest, "id" | "createdAt" | "status" | "points">): PickupRequest {
  const category = WASTE_CATEGORIES.find(c => c.id === request.category);
  const newRequest: PickupRequest = {
    ...request,
    id: String(Date.now()),
    createdAt: new Date().toISOString().split("T")[0],
    status: "pending",
    points: category?.points ?? 10,
  };
  mockPickupRequests = [newRequest, ...mockPickupRequests];
  return newRequest;
}

export function updateRequestStatus(id: string, status: PickupRequest["status"]): PickupRequest | null {
  const idx = mockPickupRequests.findIndex(r => r.id === id);
  if (idx === -1) return null;
  mockPickupRequests[idx] = { ...mockPickupRequests[idx], status };
  return mockPickupRequests[idx];
}
