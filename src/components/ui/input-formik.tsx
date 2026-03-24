import { useField } from "formik";
import { Input } from "./input";

interface Props {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const InputFormik = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={props.name} className="mb-1 text-gray-700">
          {label}
        </label>
      )}
      <Input {...field} {...props} />
      {meta.touched && meta.error ? (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
};
