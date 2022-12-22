import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { TbExternalLink } from "react-icons/tb";
import { db } from "../firebaseConfig";

function Portfolio() {
  const portCollectionRef = collection(db, "portfolio");
  
  const [portData, setPortData] = useState([]);

  //load data
  useEffect(() => {
    const unsub = onSnapshot(
      portCollectionRef,
      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPortData(list);
      },
      (error) => {
        alert(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);


  const portfolio = () => {
    return portData.sort((a, b) => b.rating - a.rating ).map((pd) => {
      return (
        <div
          className="w-full flex items-center justify-center pt-9"
          key={pd.id}
        >
          <div className="flex md:flex-row flex-col gap-5 bg-custom_light-port_list dark:bg-custom_dark-port_list w-10/12 md:max-w-5xl md:h-auto rounded-lg">
            <img
              src={pd.img}
              alt="portfolio-image"
              className=" md:w-2/5 w-full max-h-[600px] md:h-auto md:rounded-l-lg rounded-t-lg"
            />
            <div className="md:w-3/5 w-full md:p-0 p-8 md:pr-5 md:pt-3  font-normal md:text-sm text-[13px] text-left flex flex-col md:gap-y-3 gap-4">
              <div className="font-bold md:text-base text-sm flex gap-16 items-center">
                <span className="flex cursor-pointer underline">
                  {pd.title}
                  {pd.ex_link !== " " && (
                    <a
                      href={pd.ex_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TbExternalLink size={20} />
                    </a>
                  )}
                </span>
                <a href={pd.git_link} target="_blank" rel="noopener noreferrer">
                  <AiFillGithub size={20} className="cursor-pointer" />
                </a>
              </div>
              <p className="mb-2 leading-6">{pd.desc}</p>
            </div>
          </div>
        </div>
      )
    })
  };
  return (
    <div
      className="min-h-screen text-custom_both-custom_white mt-11 pb-16"
      id="portfolio"
    >
      <div className="text-center uppercase">
        <span className="block font-semibold -tracking-wide dark:text-custom_dark-secondary text-custom_light-secondary_2 md:text-xl text-lg">
          Portfolio
        </span>
        <span className="block mt-5 mb-5 md:text-3xl text-xl font-semibold">
          Latest Projects
        </span>
      </div>
      {portfolio()}

    </div>
  );
}

export default Portfolio;