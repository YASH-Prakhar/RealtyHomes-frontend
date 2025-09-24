// brokerPropertyData.js - Fake data for broker dashboard

export const brokerListings = [
  {
    id: 1,
    title: "Luxury Downtown Condo",
    location: "Downtown, Seattle",
    price: "$750,000",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 sq ft",
    type: "apartment",
    status: "active",
    image: "mdi.webp",
    description: "Modern 3-bedroom condo with panoramic city views and premium amenities.",
    owner: "Sarah Johnson",
    listedDate: "Jan 20",
    views: 245,
    inquiries: 12,
    daysOnMarket: 15
  },
  {
    id: 2,
    title: "Suburban Family Estate",
    location: "Redmond, WA",
    price: "$1,200,000",
    bedrooms: 5,
    bathrooms: 4,
    area: "3,200 sq ft",
    type: "house",
    status: "pending",
    image: "shi.jpg",
    description: "Spacious 5-bedroom estate with large backyard, pool, and 3-car garage.",
    owner: "Michael Chen",
    listedDate: "Jan 5",
    views: 432,
    inquiries: 28,
    daysOnMarket: 30
  },
  {
    id: 3,
    title: "Cozy Starter Home",
    location: "Kirkland, WA",
    price: "$485,000",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,100 sq ft",
    type: "house",
    status: "active",
    image: "shi.jpg",
    description: "Charming 2-bedroom home perfect for first-time buyers, recently renovated.",
    owner: "Lisa Rodriguez",
    listedDate: "Jan 25",
    views: 189,
    inquiries: 8,
    daysOnMarket: 10
  },
  {
    id: 4,
    title: "Modern Townhouse",
    location: "Bellevue, WA",
    price: "$650,000",
    bedrooms: 3,
    bathrooms: 3,
    area: "1,900 sq ft",
    type: "townhouse",
    status: "sold",
    image: "mdi.webp",
    description: "Contemporary 3-bedroom townhouse with smart home features and rooftop deck.",
    owner: "David Kim",
    listedDate: "Dec 15",
    views: 567,
    inquiries: 35,
    daysOnMarket: 45
  }
];

export const recentInquiries = [
  {
    id: 1,
    name: "Emma Wilson",
    property: "Luxury Downtown Condo",
    message: "Hi, I'm very interested in this property. Could we schedule a viewing for this weekend?",
    date: "2 hours ago",
    status: "new",
    contact: "emma.wilson@email.com",
    phone: "(555) 123-4567"
  },
  {
    id: 2,
    name: "James Thompson",
    property: "Suburban Family Estate",
    message: "What's the HOA fee for this property? Also, is the pool maintenance included?",
    date: "5 hours ago",
    status: "pending",
    contact: "james.t@email.com",
    phone: "(555) 234-5678"
  },
  {
    id: 3,
    name: "Maria Garcia",
    property: "Cozy Starter Home",
    message: "This looks perfect for my daughter! Can we arrange a viewing for tomorrow?",
    date: "1 day ago",
    status: "responded",
    contact: "maria.garcia@email.com",
    phone: "(555) 345-6789"
  },
  {
    id: 4,
    name: "Robert Lee",
    property: "Modern Townhouse",
    message: "Is this property still available? I'm ready to make an offer.",
    date: "2 days ago",
    status: "closed",
    contact: "r.lee@email.com",
    phone: "(555) 456-7890"
  }
];

export const marketStats = [
  {
    id: 1,
    title: "Total Listings",
    value: "24",
    change: "+3 this month",
    icon: "home",
    color: "#3b82f6"
  },
  {
    id: 2,
    title: "Active Properties",
    value: "18",
    change: "75% of total",
    icon: "activity",
    color: "#10b981"
  },
  {
    id: 3,
    title: "Pending Sales",
    value: "4",
    change: "2 new offers",
    icon: "clock",
    color: "#f59e0b"
  },
  {
    id: 4,
    title: "Closed Deals",
    value: "6",
    change: "+$2.8M volume",
    icon: "check-circle",
    color: "#8b5cf6"
  }
];

export const upcomingAppointments = [
  {
    id: 1,
    client: "Sarah Johnson",
    property: "Luxury Downtown Condo",
    date: "Today, 2:00 PM",
    type: "Viewing",
    status: "confirmed",
    notes: "Bring floor plans and HOA documents"
  },
  {
    id: 2,
    client: "Michael Chen",
    property: "Suburban Family Estate",
    date: "Tomorrow, 10:00 AM",
    type: "Open House",
    status: "scheduled",
    notes: "Expected 15-20 visitors"
  },
  {
    id: 3,
    client: "Lisa Rodriguez",
    property: "Cozy Starter Home",
    date: "Jan 28, 3:30 PM",
    type: "Contract Signing",
    status: "pending",
    notes: "Final walkthrough scheduled"
  }
];

export const performanceMetrics = {
  totalViews: 1433,
  avgDaysOnMarket: 25,
  conversionRate: 68,
  avgCommission: "$18,500",
  monthlyGoal: 85,
  monthlyProgress: 72
};