import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  helperText
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {helperText && <p className="text-gray-500 text-sm">{helperText}</p>}
    </div>
  );
};

export default InputField;
