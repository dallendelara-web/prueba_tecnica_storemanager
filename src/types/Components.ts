export interface PaswordInputType {
  Label: string;
  IsRequired?: boolean;
  TxtError?: boolean;
  Value: any;
  setValue: (value: any) => void;
  Variant?: "outlined" | "filled" | "standard"
}

export interface InvalidInputAlertType {
  Title: string;
  Description?: string;
}

export interface SubmitButtonType {
  Label: string;
  OnSubmit: (value: any) => void;
  IsDisabled: boolean;
  marginTop: number;
  small: boolean
}

export interface FilterComponentProps {
  search: string;
  setSearch: (search: string) => void;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
}

export interface ProductCardProps {
  nombre: string;
  description?: string;
  categoria: string;
  precioBase: number;
  stockTotal: number;
  descuento?: number;
  disponiblidad: "En venta" | "Descontinuado"
  variantes: [],
  rating?: number;
  thumbnail?: string;
  onEdit: () => void
}

export interface modalType {
  open: boolean,
  setOpen: (o: boolean) => void
}

export interface SimpleListProps {
  title: string;
  items: any
}


export interface UserCartCardProps {
  nombre: string;
  email: string;
  numeroCarritos: number;
  onAction: () => void
  image?: string;
}

export interface UserDetailsDrawerType {
  open: boolean,
  setOpen: (o: boolean) => void,
  details: any;
  setDetails: (o: any[]) => void,
}