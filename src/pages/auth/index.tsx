import React, { useState } from "react";
import type { NextPage } from "next";
import { Logo, CrossCircle } from "@/assets/icons";
import Image from "next/image";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const Auth: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const loginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-[72px] lg:gap-20">
      <Image src={Logo} alt="Logo" width={33} height={27} />
      <div className="relative h-auto w-[327px] rounded-lg bg-app-semi-dark-blue p-6 sm:w-[400px] sm:p-8">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-app-heading-lg font-light">
            {isLogin ? "Login" : "Sign up"}
          </h1>
          <Link
            href="/"
            className="text-app-white transition-colors duration-300 hover:text-app-red"
          >
            <CrossCircle />
          </Link>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
