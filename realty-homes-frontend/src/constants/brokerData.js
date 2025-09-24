// brokerData.js
export const brokerProfile = {
  name: "John Broker",
  title: "Professional Broker",
  agency: "Premium Realty",
  rating: 4.9,
  reviewsCount: 127,
  totalProperties: 2,
  activeListings: 2,
  portfolioValue: "$1,300,000",
  avgPropertyValue: "$650,000",
  newInquiries: 0,
  thisWeekInquiries: 0
};

export const brokerProperties = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    location: "Downtown, Seattle",
    price: "$450,000",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sq ft",
    type: "apartment",
    status: "active",
    image: "mdi.webp",
    description: "Beautiful 2-bedroom apartment in the heart of downtown with city views.",
    listedDate: "Jan 15",
    broker: "John Broker",
    agency: "Premium Realty"
  },
  {
    id: 2,
    title: "Luxury Waterfront Condo",
    location: "Capitol Hill, Seattle",
    price: "$850,000",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,800 sq ft",
    type: "condo",
    status: "active",
    image: "mdi.webp",
    description: "Premium 3-bedroom condo with waterfront views and luxury amenities.",
    listedDate: "Jan 12",
    broker: "John Broker",
    agency: "Premium Realty"
  }
];

export const recentActivity = [
  {
    id: 1,
    type: "new_listing",
    title: "New property listing created",
    time: "2 hours ago",
    icon: "plus",
    color: "#3b82f6"
  },
  {
    id: 2,
    type: "inquiry",
    title: "Received inquiry for Downtown Apartment",
    time: "4 hours ago",
    icon: "message",
    color: "#10b981"
  },
  {
    id: 3,
    type: "status_update",
    title: "Property status updated to sold",
    time: "1 day ago",
    icon: "check",
    color: "#3b82f6"
  },
  {
    id: 4,
    type: "inquiry_response",
    title: "Responded to inquiry about Luxury Condo",
    time: "2 days ago",
    icon: "reply",
    color: "#10b981"
  }
];

export const recentInquiries = [
  {
    id: 1,
    name: "Alice Johnson",
    property: "Modern Downtown Apartment",
    message: "I am interested in scheduling a viewing for this property.",
    date: "16/01/2024"
  }
];

export const monthlyStats = {
  views: 1234,
  inquiries: 1,
  activeListings: 2,
  responseRate: 98
};

export const statsChanges = {
  totalProperties: "+2%",
  portfolioValue: "+8%",
  newInquiries: "+23%",
  agencyRating: "+0.1"
};