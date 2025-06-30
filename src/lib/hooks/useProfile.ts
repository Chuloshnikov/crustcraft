import { useState, useEffect } from 'react';
import { UserProfileTypes } from '../../../types/types';

export const useProfile = () => {
  const [data, setData] = useState<UserProfileTypes | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/user-info')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  return { loading, data };
};