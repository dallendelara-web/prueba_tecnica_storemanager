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
}