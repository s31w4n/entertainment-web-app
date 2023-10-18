import React, { useState, useEffect, useRef } from "react";
import { AuthInputProps as T } from "@/types";

const AuthInput: React.FC<T> = ({
  id,
  name,
  type,
  value,
  content,
  placeholder,
  onChange,
  error,
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

  const textClass = "absolute top-[0.3rem] right-[1.6rem] ";
  const errorClass = error ? "border-app-red" : "";

  return (
    <div className="relative">
      <label htmlFor="auth" className="sr-only">
        {content}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        ref={inputRef}
        onChange={handleInputChange}
        autoComplete="off"
        className={`h-[37px] w-full cursor-pointer border-b border-app-greyish-blue bg-app-semi-dark-blue p-4 text-app-body-md font-light caret-app-red placeholder:text-app-white/50 focus:border-app-white focus:outline-none ${errorClass}`}
      />
      {err ? <p className={`${textClass} text-app-red`}>{err}</p> : null}
    </div>
  );
};

export default AuthInput;
