import { Category, Campus, Condition } from "./constants";

export interface User {
  id: string;
  username: string;
  fullName: string;
  profilePicture: string;
  verified: boolean;
  campus: Campus;
}

export interface Product {
  id: string;
  seller: User;
  title: string;
  description: string;
  price: number;
  category: Category;
  condition: Condition;
  campus: Campus;
  images: string[];
  createdAt: Date;
  savedCount: number;
  views: number;
}

export const mockUsers: User[] = [
  {
    id: "1",
    username: "chidi_books",
    fullName: "Chidi Okonkwo",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    verified: true,
    campus: "Nsukka",
  },
  {
    id: "2",
    username: "ada_tech",
    fullName: "Adaeze Nnamdi",
    profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    verified: true,
    campus: "Nsukka",
  },
  {
    id: "3",
    username: "emeka_styles",
    fullName: "Emeka Eze",
    profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    verified: false,
    campus: "Enugu",
  },
  {
    id: "4",
    username: "ngozi_deals",
    fullName: "Ngozi Igwe",
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    verified: true,
    campus: "Nsukka",
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    seller: mockUsers[0],
    title: "Engineering Mathematics Textbook",
    description: "MTH 281 textbook in excellent condition. Used for just one semester. All pages intact, no highlights or markings.",
    price: 4500,
    category: "books",
    condition: "Like New",
    campus: "Nsukka",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=600&fit=crop",
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    savedCount: 12,
    views: 89,
  },
  {
    id: "2",
    seller: mockUsers[1],
    title: "iPhone 12 Pro - 128GB Pacific Blue",
    description: "Clean iPhone 12 Pro, battery health 87%. Comes with charger and original box. No cracks or scratches.",
    price: 320000,
    category: "phones",
    condition: "Good",
    campus: "Nsukka",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&h=600&fit=crop",
    ],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    savedCount: 34,
    views: 256,
  },
  {
    id: "3",
    seller: mockUsers[2],
    title: "HP Pavilion Laptop 15\"",
    description: "HP Pavilion with i5 processor, 8GB RAM, 256GB SSD. Perfect for coding and light design work. Comes with laptop bag.",
    price: 185000,
    category: "laptops",
    condition: "Good",
    campus: "Enugu",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop",
    ],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    savedCount: 28,
    views: 178,
  },
  {
    id: "4",
    seller: mockUsers[3],
    title: "Vintage Denim Jacket - Size M",
    description: "Stylish vintage denim jacket. Worn twice. Perfect for layering. Fits true to size.",
    price: 8500,
    category: "clothing",
    condition: "Like New",
    campus: "Nsukka",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop",
    ],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    savedCount: 45,
    views: 312,
  },
  {
    id: "5",
    seller: mockUsers[0],
    title: "Study Desk with Chair",
    description: "Wooden study desk with matching chair. Perfect for hostel room. Easy to assemble/disassemble.",
    price: 15000,
    category: "furniture",
    condition: "Good",
    campus: "Nsukka",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&h=600&fit=crop",
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    savedCount: 19,
    views: 134,
  },
  {
    id: "6",
    seller: mockUsers[1],
    title: "Wireless Earbuds - JBL",
    description: "JBL wireless earbuds with charging case. Great sound quality. Battery lasts 6+ hours.",
    price: 12000,
    category: "electronics",
    condition: "New",
    campus: "Nsukka",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
    ],
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    savedCount: 67,
    views: 445,
  },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString("en-NG", { month: "short", day: "numeric" });
};
