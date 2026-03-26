export interface GetProductsResponse {
  success?: boolean;
  status?: string;
  message?: string;
  data?: any;
}

export interface GetProductsParams {
  limit: string;
  skip: string;
}

export interface ProductsVariantData {
  nombreVariante: string;
  precioVariante: number;
  stockVariante: number;
}

export interface ProductsData {
  nombre: string;
  categoria: string;
  precioBase: number;
  stockTotal: number;
  descuento?: number;
  disponiblidad: "En venta" | "Descontinuado"
  rating?: number;
  variantes: [ProductsVariantData]
}