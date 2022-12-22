import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import cool_img from "../assets/Cool_Kids_Alone_Time.png"

function About() {
  //load the database from firebase
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
      className="min-h-screen md:p-14 p-5 flex md:flex-col flex-col-reverse items-center justify-end md:items-start md:justify-center gap-9"
      id="about"
    >
      <div className="block md:w-1/2 w-4/5 break-words whitespace-pre-line">
        <span className="uppercase dark:text-custom_dark-secondary text-custom_light-secondary_1 text-lg md:text-xl font-bold">
          About Me
        </span>
        {data.map((d) => {
          return (
            <div key={d.id}>
              <p className="pt-3 text-custom_both-custom_white md:text-lg text-sm leading-loose">
                {d?.desc_1}
              </p>
              <p className="pt-3 text-custom_both-custom_white md:text-lg text-sm leading-loose">
                {d?.desc_2}
              </p>
            </div>
          );
        })}
      </div>
      <div className="md:mt-3 md:self-end self-center mr-8">
        <img src={cool_img} />
      </div>
    </div>
  );
}

export default About;
