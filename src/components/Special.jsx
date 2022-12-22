import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        className: "center",
        centerMode: true,
        centerPadding: "60px",
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

function Special() {
  const [specData, setSpecData] = useState([]);
  const specCollectionRef = collection(db, "special");

  useEffect(() => {
    const unsub = onSnapshot(
      specCollectionRef,
      (snapshot) => {
        let list = [];

        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setSpecData(list);
      },
      (error) => {
        alert(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const gridList = () => {
    return (
      <div className="text-white m-14 ">
        {specData.map((spi) => (
          <div
            className="bg-black/50 mt-11 overflow-hidden p-11 rounded-xl"
            key={spi.id}
          >
            <h1>{spi.name}</h1>
            <Slider {...settings}>
              {spi.url.map((s) => (
                <div className="flex gap-5" key={s}>
                  <img
                    src={s}
                    alt="Image"
                    className="rounded-xl mt-11 aspect-square w-40"
                  />
                </div>
              ))}
            </Slider>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className=" min-h-screen w-full text-custom_both-custom_white md:mt-0"
      id="special"
    >
      <div className="text-center uppercase">
        <span className="block font-semibold -tracking-wide dark:text-custom_dark-secondary text-custom_light-secondary_2 md:text-xl text-lg">
          What I DO
        </span>
        <span className="block mt-5 mb-5 md:text-3xl text-xl font-semibold">
          Specialize in{" "}
        </span>
      </div>
      {gridList()}
    </div>
  );
}

export default Special;