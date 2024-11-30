import { getCategories } from '@/lib/services/api';
import { Category } from '@/lib/types';
import { useState, useEffect } from 'react';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
     
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error: any) {
        
      } finally {
        
      }
    };

    fetchCategories();
  }, []); 
  return { categories };
};