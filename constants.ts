import { ChartNoAxesCombined, icons, Logs, Plus, ScrollText, Settings } from "lucide-react";

export const NavbarRoutes = [
  {
    link: "/protected/overview",
    label: "Overview",
    icon: ChartNoAxesCombined
  },
  {
    link: "/protected/transactions",
    label: "Transactions",
    icon: ScrollText
  },
  {
    link: "",
    label: "",
    icon: Plus
  },
  {
    link: "/protected/category",
    label: "Category",
    icon: Logs
  },
  {
    link: "/protected/settings",
    label: "Settings",
    icon: Settings
  },
];

export enum HttpCodes {
  Success = 200,
  UnAuthorized = 403,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}

export const StaticIconsList = [
  {
    icon: "/category-icons/home.svg",
    name: "Home",
  },
  {
    icon: "/category-icons/beauty.svg",
    name: "Beauty",
  },
  {
    icon: "/category-icons/bills.svg",
    name: "Bills",
  },
  {
    icon: "/category-icons/car.svg",
    name: "Car",
  },
  {
    icon: "/category-icons/entertainment.svg",
    name: "Entertainment",
  },
  {
    icon: "/category-icons/family_or_personal.svg",
    name: "Family Or Personal",
  },
  {
    icon: "/category-icons/food_drink.svg",
    name: "Food/Drink",
  },
  {
    icon: "/category-icons/fuel.svg",
    name: "Fuel",
  },
  {
    icon: "/category-icons/grocery.svg",
    name: "Grocery",
  },
  {
    icon: "/category-icons/healthcare.svg",
    name: "Healthcare",
  },
  {
    icon: "/category-icons/phone.svg",
    name: "Phone",
  },
  {
    icon: "/category-icons/shopping.svg",
    name: "Shopping",
  },
  {
    icon: "/category-icons/transport.svg",
    name: "Transport",
  },
  {
    icon: "/category-icons/travel.svg",
    name: "Travel",
  },
  {
    icon: "/category-icons/gift.svg",
    name: "Gift",
  },
  {
    icon: "/category-icons/education.svg",
    name: "Education",
  },
  {
    icon: "/category-icons/dress.svg",
    name: "Dress",
  },
  {
    icon: "/category-icons/pets.svg",
    name: "Pets",
  },
  {
    icon: "/category-icons/drinks.svg",
    name: "Drinks",
  },
  {
    icon: "/category-icons/toys.svg",
    name: "Toys",
  },
  {
    icon: "/category-icons/jewelry.svg",
    name: "Jewelry",
  },
];

export const DefaultIconName = "Default";

export const DBDateFormat = "yyyy-MM-dd 00:00:000";