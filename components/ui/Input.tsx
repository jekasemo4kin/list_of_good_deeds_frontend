interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  className?: string;
}

export default function Input({ value, onChange, placeholder, type = "text", className = "" }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-blue-500 md:text-base ${className}`}
    />
  );
}