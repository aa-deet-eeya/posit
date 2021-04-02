import React from "react";

export const Header: React.FC = () => (
  <div className="container mx-auto">
    <div className="flex flex-wrap justify-between w-2/3 mx-auto my-6">
      <span className="mt-1 text-4xl font-josef">Posit</span>
      <a
        href="https://github.com/aa-deet-eeya/posit"
        className="px-6 py-2 text-white bg-black font-josef"
      >
        See Source Code
      </a>
    </div>
    <div className="w-3/5 mx-auto my-32 text-6xl text-center font-josef">
      This is the Assignment for{" "}
      <span className="text-gray-400 font-josef">Full Stack Internship</span> at
      Posit
    </div>
  </div>
);
