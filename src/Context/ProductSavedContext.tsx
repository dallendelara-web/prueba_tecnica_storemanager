import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ProductsDataContextType } from '@/types/Products';

const productContext = createContext<ProductsDataContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: any }) => {
  const [nombre, setNombre] = useState<string | null>(null);
  const [disponiblidad, setDisponibilidad] = useState<ProductsDataContextType['disponiblidad']>(null);
  const [categoria, setCategoria] = useState<string | null>(null);
  const [precioBase, setPrecioBase] = useState<number | null>(null);
  const [stockTotal, setStockTotal] = useState<number | null>(null);
  const [descuento, setDescuento] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [variantes, setVariantes] = useState<ProductsDataContextType['variantes']>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(true);

  // Example: Load initial auth state from localStorage
  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    nombre ? setIsLoading(false) : setIsLoading(true);
  }, [nombre]);

  const setValues = async () => {
    const storedNombre = localStorage.getItem('nombre');
    const storedCategoria = localStorage.getItem('categoria');
    const storedPrecioBase = localStorage.getItem('precioBase');
    const storedTotal = localStorage.getItem('stockTotal');
    const storedDescuento = localStorage.getItem('descuento');
    const storedDisponibilidad = localStorage.getItem('disponiblidad');
    const storedRating = localStorage.getItem('rating');
    const storedVariantes = localStorage.getItem('variantes');
    
    setNombre(storedNombre);
    setDisponibilidad(storedDisponibilidad);
    setCategoria(storedCategoria);
    setPrecioBase(Number(storedPrecioBase));
    setStockTotal(Number(storedTotal));
    setDescuento(Number(storedDescuento));
    setRating(Number(storedRating));
    setVariantes(JSON.parse(storedVariantes));

    setIsSaved(true);
  }

  const saveProduct = async (data: any) => {
    setIsLoading(true);
      const newProduct = data;
      console.log("PRODUCTO EN EL LOCALSTORAGE")
      console.log(newProduct)

      setNombre(newProduct?.nombre);
      setDisponibilidad(newProduct?.disponiblidad);
      setCategoria(newProduct?.categoria);
      setPrecioBase(Number(newProduct?.precioBase));
      setStockTotal(Number(newProduct?.stockTotal));
      setDescuento(Number(newProduct?.descuento));
      setRating(Number(newProduct?.rating));
      setVariantes(newProduct?.variantes);


      localStorage.setItem('nombre', newProduct?.nombre);
      localStorage.setItem('disponiblidad', newProduct?.disponiblidad);
      localStorage.setItem('categoria', newProduct?.categoria);
      localStorage.setItem('precioBase', newProduct?.precioBase);
      localStorage.setItem('stockTotal', newProduct?.stockTotal);
      localStorage.setItem('descuento', newProduct?.descuento);
      localStorage.setItem('rating', newProduct?.rating);
      localStorage.setItem('variantes', JSON.stringify(newProduct?.variantes));

    setIsSaved(true);
    setIsLoading(false);
  };

  const clearProduct = () => {
    setNombre(null);
    setDisponibilidad(null);
    setCategoria(null);
    setPrecioBase(null);
    setStockTotal(null);
    setDescuento(null);
    setRating(null);
    setVariantes(null);

    localStorage.removeItem('nombre');
    localStorage.removeItem('disponiblidad');
    localStorage.removeItem('categoria');
    localStorage.removeItem('precioBase');
    localStorage.removeItem('stockTotal');
    localStorage.removeItem('descuento');
    localStorage.removeItem('rating');
    localStorage.removeItem('variantes');

    setIsSaved(false);
  };

  const value: ProductsDataContextType = {
    nombre,
    categoria,
    precioBase,
    stockTotal,
    descuento,
    disponiblidad,
    rating,
    variantes,
    saveProduct,
    clearProduct,
    isLoading,
    isSaved
  };

  return <productContext.Provider value={value}>{children}</productContext.Provider>;
};

export const useProductSaved = () => {
  const context = useContext(productContext);
  if (context === undefined) {
    throw new Error('useProductSaved must be used within an ProductProvider');
  }
  return context;
};