import React, { useState, useEffect, useRef } from "react";
import { FormInputProps as T } from "@/types";

const FormInput: React.FC<T> = ({
  id,
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

  const textClass = "absolute top-[0.3rem] right-[1rem]";
  const errorClass = error ? "border-app-red" : "";

  return (
    <div className="relative">
      <label className="sr-only">
        {content}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        ref={inputRef}
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

export default FormInput;
