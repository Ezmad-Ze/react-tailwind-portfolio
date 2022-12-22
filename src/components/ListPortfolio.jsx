import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link as RouterLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { db } from "../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

function EditPortfolio() {
  const { theme, handleTheme } = useContext(ThemeContext);
  
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

  const deletePort = async (portId) => {
    let res = confirm("Delete?");
    const portCollectionIdRef = doc(db, "portfolio", portId);
     res && deleteDoc(portCollectionIdRef) ;
  };

  return (
    <>
      <NavBar handleTheme={handleTheme} theme={theme} />
      <div className=" font-poppins dark:bg-custom_dark-background bg-custom_light-background  min-h-screen text-white w-full">
        <div className=" pt-24 p-10 flex justify-center items-center flex-col">
          <h3 className="text-center pb-5 text-lg font-bold  ">
            Portfolio List
          </h3>
          <RouterLink
            to="/create_portfolio"
            className="p-3 bg-custom_light-secondary_2 hover:bg-custom_light-secondary_2/30 dark:bg-custom_dark-secondary hover:dark:bg-custom_dark-secondary/30 rounded-xl "
          >
            Create New
          </RouterLink>
          <table className="mt-9 border-separate w-11/12 shadow-none">
            <thead>
              <tr>
                <th className="md:table-cell hidden dark:bg-custom_dark-secondary/50 bg-custom_light-secondary_2/50 text-white p-2 pb-8">
                  Image
                </th>
                <th className="dark:bg-custom_dark-secondary/50 bg-custom_light-secondary_2/50 text-white p-2">
                  Title
                </th>
                <th className="dark:bg-custom_dark-secondary/50 bg-custom_light-secondary_2/50 text-white p-2">
                  Rating
                </th>
                <th className="md:table-cell hidden dark:bg-custom_dark-secondary/50 bg-custom_light-secondary_2/50 text-white p-2 pb-2">
                  External Link
                </th>
                <th className=" dark:bg-custom_dark-secondary/50 bg-custom_light-secondary_2/50 text-white p-2">
                  Github Link
                </th>
                <th className="dark:bg-custom_dark-secondary/50 bg-custom_light-secondary_2/50 text-white p-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {portData.map((d) => {
                return (
                  <tr
                    className="dark:bg-custom_dark-secondary/30 bg-custom_light-secondary_2/30 text-white "
                    key={d.id}
                  >
                    <td className="align-middle text-center md:table-cell hidden ">
                      <img
                        src={d.img}
                        alt="port image"
                        className="w-9 h-9 rounded-3xl block ml-auto mr-auto"
                      />
                    </td>
                    <td className=" w-1/5 text-center">{d.title}</td>
                    <td className=" w-[100px] text-center">{d.rating}</td>
                    <td className="w-1/5  md:table-cell hidden ml-auto mr-auto text-center">
                      <a href={d.ex_link} className="text-blue-400 ">
                        External
                      </a>
                    </td>
                    <td className="w-1/5 text-center">
                      <a href={d.git_link} className="text-blue-400">
                        GitHub
                      </a>
                    </td>
                    <td className="table-cell text-center align-middle">
                      <RouterLink
                        to={`/edit_portfolio/${d.id}`}
                        className="ml-5"
                      >
                        Edit
                      </RouterLink>
                      <button className="ml-9" onClick={() => deletePort(d.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EditPortfolio;
