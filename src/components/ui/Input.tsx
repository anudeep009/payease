import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  fullWidth?: boolean;
}

const Input: FC<InputProps> = ({
  label,
  errorMessage,
  fullWidth = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`input-container ${fullWidth ? "w-full" : "w-auto"} ${
        className ? className : ""
      }`}
    >
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        className={`border rounded-md px-4 py-2 text-sm w-full transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          errorMessage ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
