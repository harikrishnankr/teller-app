export interface Category {
  id: number;
  icon: string;
  name: string;
  type: "expense";
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  category_id: number;
  amount: number;
  date: string;
  notes: string;
  currency: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  type: "expense";
  categories: Category;
}

export interface MonthWiseTransaction {
  month: string;
  total_transactions: number;
}