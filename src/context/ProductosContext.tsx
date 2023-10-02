/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {createContext, useState, useEffect} from 'react';
import {Producto, ProductsResponse} from '../interfaces/appInterfaces';
import cafeApi, { baseURL } from '../api/cafeApi';
import {Asset, ImagePickerResponse} from 'react-native-image-picker';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>;
};
export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
    setProducts([...resp.data.productos]);
    // setProducts([...products, ...resp.data.productos]);
  };
  const addProduct = async (
    categoryId: string,
    productName: string,
  ): Promise<Producto> => {
    const resp = await cafeApi.post<Producto>('/productos', {
      categoria: categoryId,
      nombre: productName,
    });
    setProducts([...products, resp.data]);
    return resp.data;
  };
  const updateProduct = async (
    categoryId: string,
    productName: string,
    productId: string,
  ) => {
    const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
      categoria: categoryId,
      nombre: productName,
    });
    setProducts(
      products.map(prod => {
        return prod._id === productId ? resp.data : prod;
      }),
    );
  };
  const deleteProduct = async (id: string) => {
    console.log(id);
    const resp = await cafeApi.delete<Producto>(`/productos/${id}`);
    setProducts(products.filter(prod => prod._id !== id));
  };

  const loadProductById = async (id: string): Promise<Producto> => {
    const resp = await cafeApi.get<Producto>(`/productos/${id}`);
    return resp.data;
  };
  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    // let fileToUpload;
    if (data.assets){
        const fileToUpload = {
            uri: data.assets[0].uri,
            type: data.assets[0].type,
            name: data.assets[0].fileName,
          };
          const formData = new FormData();
          formData.append('archivo', fileToUpload);

          try {
            // const resp = await fetch(`${baseURL}/uploads/productos/${id}`, {
            //     method: 'PUT',
            //     body: formData,
            // });
              const resp = await cafeApi.put(`/uploads/productos/${id}`, formData,{
                headers: { 'Content-Type': 'multipart/form-data' },
              });
              console.log(resp);
      } catch (error) {
        console.log(error);
      }
      }
        // console.log(fileToUpload)
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
