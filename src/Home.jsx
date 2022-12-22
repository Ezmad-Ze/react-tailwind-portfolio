import React, { useState, useEffect, useContext } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Special from "./components/Special";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ThemeContext } from "./context/ThemeContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

function Home() {
  const { theme, handleTheme } = useContext(ThemeContext);

  //database reference from firebase
  const CollectionRef = collection(db, "special");
  const [data, setData] = useState([]);

  //load data from the database
  useEffect(() => {
    const unsub = onSnapshot(
      CollectionRef,
      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      {data.length !== 0 ? (
        <div className=" font-poppins dark:bg-custom_dark-background bg-custom_light-background min-h-screen">
          <NavBar handleTheme={handleTheme} theme={theme} />
          <Hero />
          <About />
          <Special />
          <Portfolio />
          <Contact />
          <Footer />
        </div>
      ) : (
        <div className=" font-poppins dark:bg-custom_dark-background bg-custom_light-background min-h-screen flex justify-center items-center">
          <NavBar handleTheme={handleTheme} theme={theme} />
          <h3 className="text-3xl text-white">LOADING . . .</h3>
        </div>
      )}
    </>
  );
}

export default Home;
