import React from "react";
import emailjs from "emailjs-com";
import { AiOutlineMail, AiFillPhone } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_REACT_APP_SERVICE_ID,
        import.meta.env.VITE_REACT_APP_TEMPLATE,
        e.target,
        import.meta.env.VITE_REACT_APP_EMAIL_PUBLIC
      )
      .then(
        (result) => {
          //goto sucess page
          navigate("/success");
        },
        (error) => {
          alert(error.text);
        }
      );
    //reset the form after submit  
    e.target.reset();
  };


  const getInTouch = () => {
    return (
      <div className=" dark:bg-custom_both-custom_special bg-custom_light-left_contact w-2/5 hidden md:flex flex-col gap-11 p-5 items-center justify-center">
        <span className="capitalize font-bold text-3xl text-center ">
          Get in touch
        </span>
        <div className="flex justify-center items-center gap-2 dark:hover:text-white hover:text-custom_dark-secondary ">
          <AiOutlineMail size={17} />
          <a href="mailto: endeamlakzcsn3@gmail.com">
            endeamlakzcsn3@gmail.com
          </a>
        </div>
        <div className="flex justify-center items-center gap-2 dark:hover:text-white hover:text-custom_dark-secondary ">
          <AiFillPhone size={17} />
          <a href="tel: +251933181204">+251-9-33-18-12-04</a>
        </div>
      </div>
    );
  };

  //form to submit the email
  const contactForm = () => {
    return (
      <form
        method="post"
        onSubmit={sendEmail}
        className="flex flex-col gap-5 rounded text-custom_light-background dark:text-custom_dark-secondary text-center"
      >
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="p-3 md:pl-9 pl-3 focus:outline-none rounded-lg"
        />
        <input
          type="number"
          name="phone"
          id="pnone"
          placeholder="Phone Number*"
          required
          className="p-3 md:pl-9 pl-3 focus:outline-none rounded-lg"
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address*"
          className="p-3 md:pl-9 pl-3 focus:outline-none rounded-lg"
        />
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Subject*"
          required
          className="p-3 md:pl-9 pl-3 focus:outline-none rounded-lg"
        />
        <textarea
          name="message"
          id="message"
          cols=""
          rows="10"
          placeholder="Message*"
          required
          className="p-3 md:pl-9 pl-3 focus:outline-none rounded-lg"
        ></textarea>
        <input
          type="submit"
          value="Submit"
          className="bg-white dark:bg-custom_dark-secondary dark:hover:bg-white dark:hover:text-custom_dark-secondary text-custom_light-background dark:text-white hover:text-white hover:bg-custom_light-background w-32 py-2 rounded-xl font-semibold text-base self-center"
        />
      </form>
    );
  };
  return (
    <div
      className="min-h-screen w-full flex md:justify-start justify-center text-white dark:text-custom_dark-secondary pb-24 md:pb-0 mt-5"
      id="contact"
    >
      {getInTouch()}
      <div className=" bg-black/30 dark:bg-custom_dark-port_list/80  md:w-3/5 w-4/5 flex md:justify-center md:p-16 p-7  flex-col gap-5 rounded-lg md:rounded-none">
        <span className="font-bold text-2xl capitalize">Contact Me</span>
        {contactForm()}
      </div>
    </div>
  );
}

export default Contact;
