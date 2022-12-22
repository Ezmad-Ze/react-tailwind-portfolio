import React from "react";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";

function Footer() {
  return (
    <div className="w-full h-42 md:h-36 bg-custom_dark-port_list/80 dark:bg-custom_dark-port_list  text-white flex flex-col gap-9 md:items-center md:justify-center">
      <div className="flex flex-col gap-3 md:hidden mt-3">
        <div className="flex justify-center items-center gap-2 dark:hover:text-custom_dark-secondary hover:text-custom_light-secondary_2">
          <AiOutlineMail size={17} className="cursor-pointer" />
          <a href="mailto: endeamlakzcsn3@gmail.com">
            endeamlakzcsn3@gmail.com
          </a>
        </div>
        <div className="flex justify-center items-center gap-2 dark:hover:text-custom_dark-secondary hover:text-custom_light-secondary_2">
          <AiFillPhone size={17} className="cursor-pointer" />
          <a href="tel: +251933181204">+251-9-33-18-12-04</a>
        </div>
      </div>
      <div className="flex items-center justify-evenly md:gap-48 md:mt-9">
        <a
          href="https://t.me/Camouflage101"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTelegram
            size={30}
            className="cursor-pointer  dark:hover:text-custom_dark-secondary hover:text-custom_light-secondary_2 hover:bg-custom_light-background"
          />
        </a>
        <a
          href="https://github.com/Ezmad-Ze"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub
            size={30}
            className="cursor-pointer dark:hover:text-custom_dark-secondary hover:text-custom_light-secondary_2 hover:bg-custom_light-background"
          />
        </a>
      </div>
      <div className="text-right text-xs self-end mr-3 mb-6 md:mt-0">
        COPYRIGHT © {new Date().getFullYear()} CV EZWAD
      </div>
    </div>
  );
}

export default Footer;
