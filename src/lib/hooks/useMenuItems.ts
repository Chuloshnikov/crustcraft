import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { MenuItem } from '../../../types/types';




export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get all items
  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/menu-items');
      
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }

      const data = await response.json();
      setMenuItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  // Create new item
  const createMenuItem = async (itemData: Omit<MenuItem, '_id'>) => {
    try {
      setLoading(true);
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error('Failed to create menu item');
      }

      const newItem = await response.json();
      setMenuItems(prev => [...prev, newItem]);
      toast.success('Menu item created successfully');
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Failed to create menu item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update item
  const updateMenuItem = async (id: string, itemData: Partial<MenuItem>) => {
    try {
      setLoading(true);
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id, ...itemData }),
      });

      if (!response.ok) {
        throw new Error('Failed to update menu item');
      }

      setMenuItems(prev =>
        prev.map(item => (item._id === id ? { ...item, ...itemData } : item))
      );
      toast.success('Menu item updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Failed to update menu item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const deleteMenuItem = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/menu-items?_id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete menu item');
      }

      setMenuItems(prev => prev.filter(item => item._id !== id));
      toast.success('Menu item deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Failed to delete menu item');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Загружаем товары при монтировании
  useEffect(() => {
    fetchMenuItems();
  }, []);

  return {
    menuItems,
    loading,
    error,
    fetchMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
};