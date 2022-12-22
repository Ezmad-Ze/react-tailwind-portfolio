import React, { useEffect, useState } from "react";
import { collection,  onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Hero = () => {
  const cvCollectionRef = collection(db, "cv");
  
  const [data, setData] = useState([]);
  
  //load data
  useEffect(() => {
    const unsub = onSnapshot(
      cvCollectionRef,
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
    <div
      className="bg-light-img dark:bg-dark-img min-h-screen pt-28 pb-14 bg-cover bg-center backdrop:blur-lg text-white dark:text-custom_dark-large_text font-extrabold text-4xl text-center flex flex-col items-center justify-center uppercase gap-6 tracking-[10px]"
      id="hero"
    >
      <span>Hello, I am </span>
      <span className=" tracking-[10px] md:tracking-[30px] text-custom_light-large_text dark:text-custom_dark-secondary flex flex-col gap-4 mt-4">
        <span className="block">Endeamlak</span>
        <span className="block">Zeleke</span>
      </span>
      <span className="text-base tracking-widest mt-5">
        Junior Fullstack Developer
      </span>
      <div className="flex flex-col gap-5">
        {data.map((d) => {
          return (
            <a
              key={d.id}
              href={d.cv_file}
              className="pt-6 text-sm tracking-widest dark:text-custom_dark-secondary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Preview CV
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
