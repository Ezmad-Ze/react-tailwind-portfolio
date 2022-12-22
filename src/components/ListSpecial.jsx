import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link as RouterLink } from "react-router-dom";
import NavBar from "./NavBar";
import { db } from "../firebaseConfig";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

const ListSpecial = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  
  const specCollectionRef = collection(db, "special");
  
  const [specData, setSpecData] = useState([]);

  //load data
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

  const deletePort = async (specId) => {
    let res = confirm("Delete?");
    const specCollectionIdRef = doc(db, "special", specId);
     res && deleteDoc(specCollectionIdRef) ;
  };

  return (
    <>
      <NavBar handleTheme={handleTheme} theme={theme} />
      <div className=" font-poppins dark:bg-custom_dark-background bg-custom_light-background  min-h-screen text-white w-full">
        <div className=" pt-24 p-10 flex justify-center items-center flex-col">
          <h3 className="text-center pb-5 text-lg font-bold  ">
            Specialization List
          </h3>
          <RouterLink
            to="/create_special"
            className="p-3 bg-custom_light-secondary_2 hover:bg-custom_light-secondary_2/30 dark:bg-custom_dark-secondary hover:dark:bg-custom_dark-secondary/30 rounded-xl "
          >
            Create New
          </RouterLink>
          <table className="mt-9 border-separate w-11/12 shadow-none">
            <thead>
              <tr>
                <th className="dark:bg-custom_dark-secondary/50 bg-custom_light-secondary_2/50 text-white p-2">
                  Technology Name
                </th>
                <th className="dark:bg-custom_dark-secondary/50 bg-custom_light-secondary_2/50 text-white p-2">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {specData.map((d)=> {
                return (
                  <tr
                    className="dark:bg-custom_dark-secondary/30 bg-custom_light-secondary_2/30 text-white "
                    key={d.id}
                  >

                    <td className="table-cell text-center align-middle">{d.name}</td>
                    <td className="table-cell text-center align-middle">
                      <RouterLink
                        to={`/create_special/${d.id}`}
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
};

export default ListSpecial;
