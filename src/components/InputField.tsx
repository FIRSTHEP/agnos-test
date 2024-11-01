import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  icon?: React.ReactNode; // New prop for the icon
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  required,
  placeholder,
  maxLength,
  icon // Destructure the icon prop
}) => {
  return (
    <div className="mb-4 relative"> {/* Added relative positioning for the icon */}
      <label className="block mb-1 font-semibold text-gray-700">{label}</label>
      <div className="flex items-center border rounded-lg overflow-hidden"> {/* Flex container for input and icon */}
        {icon && (
          <span className="flex items-center justify-center pl-2.5 pr-2.5 text-gray-600"> {/* Removed background color */}
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`flex-1 p-3 ${error ? 'border-red-500' : 'border-gray-300'} transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
