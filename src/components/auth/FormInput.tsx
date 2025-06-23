import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  inputType: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  Icon?: LucideIcon;
  id: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  inputType,
  label,
  value,
  onChange,
  placeholder = '',
  Icon,
  id,
  required = true,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <Input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
          required={required}
        />
      </div>
    </div>
  );
};

export default FormInput;