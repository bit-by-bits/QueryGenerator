import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormFieldProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  extra?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  type,
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  extra
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <Label htmlFor={id}>{label}</Label>
      {extra}
    </div>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default FormField;
