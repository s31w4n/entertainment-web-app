import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed right-0 top-0 z-10 flex h-screen w-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-app-red"></div>
    </div>
  );
};

export default Loading;
