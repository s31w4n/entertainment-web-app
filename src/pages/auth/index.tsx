import React from "react";
import type { NextPage } from "next";
import { Logo } from "@/assets/icons";
import Image from "next/image";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import { useAppSelector } from "@/app/hooks";

const Auth: NextPage = () => {
  const isLoginMode = useAppSelector((state) => state.auth.isLoginMode);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-[72px] lg:gap-20">
      <Link href="/">
        <Image src={Logo} alt="Logo" width={33} height={27} />
      </Link>
      <div className="relative h-auto w-[327px] rounded-lg bg-app-semi-dark-blue p-6 sm:w-[400px] sm:p-8">
        <div className="mb-10">
          <h1 className="text-app-heading-lg font-light">
            {isLoginMode ? "Login" : "Sign up"}
          </h1>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
