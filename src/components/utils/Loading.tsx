import React from "react";

export const Loading: React.FC = () => (
  <div className="flex mx-auto justify-center my-20">
    <div className="my-auto font-josef mr-10 text-4xl">Getting Images</div>
    <div className="animate-spin my-auto rounded-full border-t-2 border-gray-500 h-20 w-20"></div>
  </div>
);
