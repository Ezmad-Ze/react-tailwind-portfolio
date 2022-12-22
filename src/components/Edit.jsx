import React, { useContext } from "react";
import NavBar from "./NavBar";
import { Link as RouterLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Edit() {
  const { theme, handleTheme } = useContext(ThemeContext);

  //button template
  const editButton = (text, path) => {
    return (
      <RouterLink to={path}>
        <div className=" mt-9 flex items-center justify-center">
          <button className=" w-9/12 h-24 bg-custom_light-secondary_2 hover:bg-custom_light-secondary_2/80 dark:bg-custom_dark-secondary hover:dark:bg-custom_dark-secondary/80 text-custom_both-custom_white font-bold text-2xl capitalize">
            {text}
          </button>
        </div>
      </RouterLink>
    );
  };

  return (
    <>
      <NavBar handleTheme={handleTheme} theme={theme} />
      <div className=" font-poppins dark:bg-custom_dark-background bg-custom_light-background  min-h-screen text-white">
        <div className=" pt-24 p-10">
          <hr />
          {editButton("CV and About", "/edit_cv")}
          {editButton("Special", "/list_special")}
          {editButton("Portfolio", "/list_portfolio")}
        </div>
      </div>
    </>
  );
}

export default Edit;
