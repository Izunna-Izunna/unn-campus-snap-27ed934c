export interface Request {
  id: string;
  username: string;
  avatar: string;
  location: string;
  timeAgo: string;
  title: string;
  budgetMin: number;
  budgetMax: number;
  description: string;
  category: string;
  condition: string;
  offersCount: number;
  viewsCount: number;
  image?: string;
}

export interface Advert {
  id: string;
  username: string;
  avatar: string;
  location: string;
  verified: boolean;
  type: 'service' | 'event' | 'business' | 'announcement';
  title: string;
  price?: number;
  description: string;
  phone?: string;
  whatsapp?: string;
  image?: string;
  timeAgo: string;
}

export const mockRequests: Request[] = [
  {
    id: "req-1",
    username: "john_doe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    location: "Nsukka",
    timeAgo: "2h ago",
    title: "Engineering Mathematics Textbook",
    budgetMin: 2000,
    budgetMax: 4000,
    description: "Need it urgently for exams next week. Any edition is fine as long as it covers calculus and linear algebra.",
    category: "books",
    condition: "any",
    offersCount: 3,
    viewsCount: 18,
  },
  {
    id: "req-2",
    username: "sarah_k",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    location: "Nsukka",
    timeAgo: "5h ago",
    title: "Working Laptop for School",
    budgetMin: 80000,
    budgetMax: 120000,
    description: "Looking for a good laptop for programming. Preferably 8GB RAM and above.",
    category: "electronics",
    condition: "like-new",
    offersCount: 7,
    viewsCount: 45,
  },
  {
    id: "req-3",
    username: "mike_m",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    location: "Enugu",
    timeAgo: "1d ago",
    title: "Double Bed Mattress",
    budgetMin: 15000,
    budgetMax: 25000,
    description: "Moving to a new hostel, need a comfortable mattress. Must be in good condition.",
    category: "furniture",
    condition: "good",
    offersCount: 2,
    viewsCount: 12,
  },
  {
    id: "req-4",
    username: "ada_chi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    location: "Nsukka",
    timeAgo: "3h ago",
    title: "Chemistry Lab Coat",
    budgetMin: 1500,
    budgetMax: 3000,
    description: "Need a white lab coat for chemistry practicals. Size M or L.",
    category: "fashion",
    condition: "new",
    offersCount: 5,
    viewsCount: 22,
  },
];

export const mockAdverts: Advert[] = [
  {
    id: "adv-1",
    username: "studyhelp",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    location: "Nsukka",
    verified: true,
    type: "service",
    title: "Engineering Tutoring Services",
    price: 1500,
    description: "Get help with Calculus, Physics, and Engineering Mathematics. 5+ years experience tutoring UNN students.",
    phone: "0812-XXX-XXXX",
    whatsapp: "0812-XXX-XXXX",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    timeAgo: "1d ago",
  },
  {
    id: "adv-2",
    username: "techrepair",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    location: "Nsukka",
    verified: true,
    type: "service",
    title: "Phone & Laptop Repairs",
    price: 2000,
    description: "Fast and reliable repairs for all phone and laptop brands. Screen replacement, software issues, and more.",
    phone: "0803-XXX-XXXX",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
    timeAgo: "2d ago",
  },
  {
    id: "adv-3",
    username: "unntalks",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    location: "Nsukka",
    verified: false,
    type: "event",
    title: "Tech Career Fair 2024",
    description: "Join us for the biggest tech career fair in UNN! Network with recruiters from top companies. Free entry!",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
    timeAgo: "6h ago",
  },
  {
    id: "adv-4",
    username: "foodiehub",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    location: "Nsukka",
    verified: true,
    type: "business",
    title: "Home-Cooked Meals Delivery",
    price: 800,
    description: "Delicious home-cooked meals delivered to your hostel. Rice, beans, jollof, and more!",
    whatsapp: "0815-XXX-XXXX",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    timeAgo: "4h ago",
  },
];

export const requestCategories = [
  { id: "all", label: "All" },
  { id: "books", label: "Books" },
  { id: "electronics", label: "Electronics" },
  { id: "furniture", label: "Furniture" },
  { id: "fashion", label: "Fashion" },
  { id: "services", label: "Services" },
];

export const advertTypes = [
  { id: "all", label: "All" },
  { id: "service", label: "Services" },
  { id: "event", label: "Events" },
  { id: "business", label: "Business" },
  { id: "announcement", label: "Announcements" },
];
