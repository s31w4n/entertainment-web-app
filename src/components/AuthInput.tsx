import React, { useState, useEffect, useRef } from "react";
import { AuthInputProps as T } from "@/types";

const AuthInput: React.FC<T> = ({
  id,
  type,
  placeholder,
  error,
  value,
  onChange,
}) => {
  const [err, setErr] = useState(error);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setErr(error);
  }, [error]);

  function handleInputChange() {
    if (inputRef.current) {
      const value = inputRef.current.value.trim();
      onChange(value);
    }
  }

  const textClass = "absolute top-[0.3rem] right-[1rem]";
  const errorClass = error ? "border-app-red" : "";

  return (
    <div className="relative">
      <label htmlFor="auth" className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        type={type}
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        autoComplete="off"
        className={`h-[37px] w-full cursor-pointer border-b border-app-greyish-blue bg-app-semi-dark-blue p-4 text-app-body-md font-light caret-app-red placeholder:text-app-white/50 focus:border-app-white focus:outline-none ${errorClass}`}
      />
      {err ? (
        <p className={`${textClass} text-[13px] text-app-red`}>{err}</p>
      ) : null}
    </div>
  );
};

export default AuthInput;
