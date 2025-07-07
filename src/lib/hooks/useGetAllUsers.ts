import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { UserInfoProps } from '../../../types/types';

export const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState<UserInfoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get all users
  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/user-info/all');

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setAllUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };


  // Update user
  const updateUser = async (id: string, userData: Partial<UserInfoProps>) => {
    try {
      setLoading(true);
      const response = await fetch('/api/user-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: id, ...userData }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      setAllUsers(prev =>
        prev.map(user => (user._id === id ? { ...user, ...userData } : user))
      );
      toast.success('User updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Failed to update user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user-info?_id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setAllUsers(prev => prev.filter(user => user._id !== id));
      toast.success('User deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast.error('Failed to delete user');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return {
    allUsers,
    loading,
    error,
    fetchAllUsers,
    updateUser,
    deleteUser,
  };
};