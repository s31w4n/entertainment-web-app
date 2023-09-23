import React from "react";
import { useRouter } from "next/router";
import { LeftArrow } from "@/assets/icons";

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="pb-6 md:pb-8">
      <button
        onClick={handleGoBack}
        className="group flex items-center justify-center gap-2 rounded-lg bg-app-red px-4 py-1 text-[14px] md:text-[1rem]"
      >
        <LeftArrow className="transition-transform group-hover:translate-x-[-5px]" />
        Back
      </button>
    </div>
  );
};

export default BackButton;
