import React, { useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const NavBar = ({ handleTheme, theme }) => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [open, setOpen] = useState(false);
  
  const [scroll, setScroll] = useState(false);


  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      alert("You are logged out");
    } catch (error) {
      alert(error);
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleScroll = () => {
    if (window.scrollY >= 120) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  window.addEventListener("scroll", handleScroll);

  const navList = () => {
    return (
      <>
        <li className="cursor-pointer hover:decoration-custom_light-secondary-1 hover:underline">
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            About
          </ScrollLink>
        </li>
        <li className="cursor-pointer hover:decoration-custom_light-secondary-1 hover:underline">
          <ScrollLink
            to="special"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            What I Do
          </ScrollLink>
        </li>
        <li className="cursor-pointer hover:decoration-custom_light-secondary-1 hover:underline">
          <ScrollLink
            to="portfolio"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Work
          </ScrollLink>
        </li>
        <li className="cursor-pointer hover:decoration-custom_light-secondary-1 hover:underline">
          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Contact
          </ScrollLink>
        </li>

        {user ? (
          <>
            <li className="cursor-pointer hover:decoration-custom_light-secondary-1 hover:underline">
              <RouterLink to="/edit">Edit</RouterLink>
            </li>
            <li
              className="cursor-pointer hover:decoration-custom_light-secondary-1 hover:underline"
              onClick={handleLogout}
            >
              Logout
            </li>
          </>
        ) : (
          <li className="cursor-pointer hover:decoration-custom_light-secondary-1 hover:underline">
            <RouterLink to="/login">Login</RouterLink>
          </li>
        )}
      </>
    );
  };

  return (
    <>
      <nav
        className={`fixed z-10 top-0 left-0 right-0 flex items-center justify-between p-7 text-custom_both-custom_white ${
          scroll === false
            ? "bg-gradient-to-b from-custom_light-large_text  dark:from-custom_dark-background"
            : "bg-custom_light-large_text dark:bg-custom_dark-secondary"
        }`}
      >
        <span className="tracking-widest text-center font-bold text-xl cursor-pointer">
          {location.pathname === "/" ? (
            <ScrollLink
              to="hero"
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
            >
              EZWAD
            </ScrollLink>
          ) : (
            <RouterLink to="/"> EZWAD</RouterLink>
          )}
        </span>
        <div className="cursor-pointer md:hidden" onClick={handleClick}>
          {location.pathname === "/" && <RxHamburgerMenu size={30} />}
        </div>
        <ul className="md:flex gap-6 uppercase font-medium hidden">
          {location.pathname === "/" && navList()}
        </ul>
        {location.pathname === "/" && (
          <ul
            className={
              open
                ? "fixed inset-0 left-1/4 flex flex-col items-center justify-evenly text-center bg-black/40 backdrop-blur-md uppercase font-medium md:hidden "
                : "hidden"
            }
          >
            <RxCross1
              size={25}
              onClick={handleClick}
              className="cursor-pointer"
            />
            {navList()}
          </ul>
        )}
      </nav>
      <div
        className="cursor-pointer text-custom_light-secondary_1 dark:text-custom_dark-large_text fixed right-0  top-1/4 p-1 pr-4 mt-3 rounded-l-lg bg-custom_light-large_text dark:bg-custom_dark-secondary"
        onClick={handleTheme}
      >
        {theme === "dark" ? <BsSunFill size={20} /> : <BsMoonFill size={20} />}
      </div>
    </>
  );
};

export default NavBar;
