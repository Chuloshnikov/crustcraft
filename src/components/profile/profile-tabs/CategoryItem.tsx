import { Button } from '@/components/ui/button';
import React from 'react';
import { CategoryTypes } from '../../../../types/types';

interface CategoryItemProps {
  category: CategoryTypes;
  setEditCategory: React.Dispatch<React.SetStateAction<CategoryTypes | null>>;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteClick: (id: string | undefined) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  setEditCategory,
  setCategoryName,
  handleDeleteClick
}) => {
  return (
    <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
      <span className="text-gray-700">edit category: {category.name}</span>
      <div className="flex gap-2">
        <Button 
          onClick={() => {
            setEditCategory(category);
            setCategoryName(category.name);
          }}
          size="sm" 
          variant="outline"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteClick(category._id)}
          size="sm"
          variant="outline"
          className="text-red-600 hover:text-red-700 bg-transparent"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CategoryItem;
