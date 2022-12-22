import React from "react";
import { Link as RouterLink } from "react-router-dom";

function NoPage() {
  //back to home
  const back = () => {
    return (
      <RouterLink
        to="/"
        className={` text-white text-lg px-5 rounded-lg bg-black mt-9 p-5`}
      >
        Back to Home
      </RouterLink>
    );
  };
  
  return (
    <div className=" bg-yellow-800 min-h-screen flex items-center justify-center flex-col gap-6 capitalize text-2xl text-white">
      Page Not Found
      {back()}
    </div>
  );
}

export default NoPage;
