import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import NavBar from "./NavBar";

function Success() {
  const { theme, handleTheme } = useContext(ThemeContext);
  const back = () => {
    return (
      <RouterLink
        to="/"
        className={` text-black text-lg px-5 rounded-lg bg-white/70`}
      >
        Back to Home
      </RouterLink>
    );
  };
  return (
    <>
      <NavBar handleTheme={handleTheme} theme={theme} />
      <div className=" font-poppins dark:bg-custom_dark-background bg-custom_light-background  min-h-screen text-white w-full flex justify-center items-center">
        <div className=" pt-24 p-10 flex justify-center items-center flex-col">
          Thank You for sending the email!!!
          {back()}
        </div>
      </div>
    </>
  );
}

export default Success;