import {useState, useEffect} from 'react';
import cafeApi from '../api/cafeApi';
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces';

export const useCategories = () => {

    const [isLoading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Categoria[]>([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async ()=>{
        const res = await cafeApi.get<CategoriesResponse>('/categorias');
        setCategories(res.data.categorias);
        setLoading(false);
    };
  return {
    isLoading,
    categories,
  };
};
