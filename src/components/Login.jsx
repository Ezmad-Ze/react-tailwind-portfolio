import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { UserAuth } from "../context/AuthContext";

function Login() {
  const { theme } = useContext(ThemeContext);
  const { login } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  // back to home
  const back = () => {
    return (
      <RouterLink
        to="/"
        className={` text-white text-lg absolute top-3 p-2 px-5 rounded-lg ${
          theme === "light"
            ? "bg-custom_light-secondary_2"
            : "bg-custom_dark-secondary"
        }`}
      >
        Back to Home
      </RouterLink>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`${
        theme === "light"
          ? " bg-custom_light-background"
          : " bg-custom_dark-background"
      } min-h-screen w-full overflow-hidden flex flex-col items-center justify-center`}
    >
      {back()}
      <div
        className={`border border-blue-900 p-7 rounded-xl w-11/12 max-w-lg ${
          theme === "light"
            ? " bg-custom_light-footer/90"
            : " bg-custom_both-custom_special/90"
        }`}
      >
        <form
          className="flex flex-col items-center justify-center gap-5 "
          onSubmit={handleSubmit}
        >
          <h3 className="text-white uppercase tracking-widest">Login</h3>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="p-3 pl-6 rounded-xl focus:outline-none  border-blue-500 border-2 w-11/12"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="p-3 pl-6 rounded-xl focus:outline-none  border-blue-500 border-2 w-11/12"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="text-red-900 text-base capitalize -mt-3">
            {error}
          </span>
          <input
            type="submit"
            value="Submit"
            className={`p-3 text-custom_light-secondary_1 rounded-lg w-9/12 hover:opacity-60 tracking-wider text-lg font-semibold uppercase ${
              theme === "light"
                ? "bg-custom_light-secondary_2 "
                : "bg-custom_dark-secondary"
            }`}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
