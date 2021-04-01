import React from "react";

export const Header: React.FC = () => (
  <div className="container mx-auto">
    <div className="flex flex-wrap justify-between mx-auto my-6 w-2/3">
      <span className="font-josef text-4xl mt-1">Posit</span>
      <button className="font-josef bg-black text-white px-6 py-2">
        See Source Code
      </button>
    </div>
    <div className="text-6xl text-center font-josef w-3/5 mx-auto my-32">
      This is the Assignment for{" "}
      <span className="font-josef text-gray-400">Full Stack Internship</span> at
      Posit
    </div>
  </div>
);
