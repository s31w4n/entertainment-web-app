import React, { useState } from "react";
import { Logo, CrossCircle } from "@/assets/icons";
import Image from "next/image";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";

const ForgetPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    emailError: "",
    isLoading: false,
  });

  const handleEmail = () => {};

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-[72px] lg:gap-20">
      <Image src={Logo} alt="Logo" width={33} height={27} />
      <div className="relative h-auto w-[327px] rounded-lg bg-app-semi-dark-blue p-6 sm:w-[400px] sm:p-8">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-app-heading-lg font-light">Forget Password</h1>
          <Link
            href="/auth"
            className="text-app-white transition-colors duration-300 hover:text-app-red"
          >
            <CrossCircle />
          </Link>
        </div>
        <form className="flex flex-col gap-6">
          <AuthInput
            id="email"
            name="email"
            type="email"
            placeholder="Email address"
            content="Your Email"
            value={formData.email}
            error={formData.emailError}
            onChange={handleEmail}
          />
          <AuthButton
            isLoading={formData.isLoading}
            text="Send Forget Password Email"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
