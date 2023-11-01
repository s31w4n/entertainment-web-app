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
        className="group rounded-lg bg-app-red px-4 py-1"
      >
        <LeftArrow className="transition-transform group-hover:translate-x-[-5px]" />
      </button>
    </div>
  );
};

export default BackButton;
