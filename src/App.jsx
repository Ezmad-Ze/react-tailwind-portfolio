import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from "./Home";
import Login from "./components/Login";
import Edit from "./components/Edit";
import { ThemeContext } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./components/NoPage";
import { AuthContextProvider } from "./context/AuthContext";
import ListPortfolio from "./components/ListPortfolio";
import ListSpecial from "./components/ListSpecial";
import EditCV from "./components/EditCV";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePortfolio from "./components/CreatePortfolio";
import CreateSpecial from "./components/CreateSpecial";
import Success from "./components/Success";

function App() {
  const [theme, setTheme] = useState(null);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  //check the default color scheme of the window
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  //adding and removing the dark and light mode
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <AuthContextProvider>
      <ThemeContext.Provider value={{ theme, setTheme, handleTheme }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/success" element={<Success />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/edit"
              element={
                <ProtectedRoute>
                  <Edit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit_cv"
              element={
                <ProtectedRoute>
                  <EditCV />
                </ProtectedRoute>
              }
            />
            <Route
              path="/list_special"
              element={
                <ProtectedRoute>
                  <ListSpecial />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create_special"
              element={
                <ProtectedRoute>
                  <CreateSpecial />
                </ProtectedRoute>
              }
            />{" "}
            <Route
              path="/create_special/:id"
              element={
                <ProtectedRoute>
                  <CreateSpecial />
                </ProtectedRoute>
              }
            />
            <Route
              path="/list_portfolio"
              element={
                <ProtectedRoute>
                  <ListPortfolio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create_portfolio"
              element={
                <ProtectedRoute>
                  <CreatePortfolio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit_portfolio/:id"
              element={
                <ProtectedRoute>
                  <CreatePortfolio />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
