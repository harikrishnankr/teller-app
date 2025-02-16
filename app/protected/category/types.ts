import { Category } from "@/types";

export interface CategoryListProps {
  categories: Category[];
}

export interface CategoryExtra extends Category {
  checked: boolean;
}

export interface CategoryItemsProps {
  list: Category[];
}

export interface AddCategoryProps {
  open: boolean;
  data?: EditCategory;
  onOpen: (e: boolean) => void;
  onClose: (e: boolean) => void;
}

export interface AddCategoryForm {
  icon: string;
  categoryName: string;
  categoryNameError: string;
  iconError: string;
}

export interface EditCategory {
  icon: string;
  id: number;
  name: string;
}
