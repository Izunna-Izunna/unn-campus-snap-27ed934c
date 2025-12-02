import { BookOpen, Smartphone, Laptop, Monitor, Sofa, Shirt, Watch, Package } from "lucide-react";

export const CATEGORIES = [
  { id: "all", label: "All", icon: Package },
  { id: "books", label: "Books", icon: BookOpen },
  { id: "electronics", label: "Electronics", icon: Monitor },
  { id: "phones", label: "Phones", icon: Smartphone },
  { id: "laptops", label: "Laptops", icon: Laptop },
  { id: "furniture", label: "Furniture", icon: Sofa },
  { id: "clothing", label: "Clothing", icon: Shirt },
  { id: "accessories", label: "Accessories", icon: Watch },
] as const;

export const CAMPUSES = [
  "Nsukka",
  "Enugu",
  "Aba",
  "Ituku-Ozalla",
] as const;

export const CONDITIONS = [
  "New",
  "Like New",
  "Good",
  "Fair",
] as const;

export type Category = typeof CATEGORIES[number]["id"];
export type Campus = typeof CAMPUSES[number];
export type Condition = typeof CONDITIONS[number];
