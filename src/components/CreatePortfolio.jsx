import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const CreatePortfolio = () => {
  const portCollectionRef = collection(db, "portfolio");

  const { theme, handleTheme } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [changeData, setchangeData] = useState({});
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  const [portData, setPortData] = useState([]);

  {
    id &&
      useEffect(() => {
        const portCollectionIdRef = doc(db, "portfolio", id);
        onSnapshot(portCollectionIdRef, (doc) => {
          setPortData([{ ...doc.data(), id: doc.id }]);
        });
      }, []);
  }
  
  useEffect(() => {
    const uploadFile = () => {
      const name = image.name + new Date().getTime();
      const storageRef = ref(storage, "portfolio/" + name);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setchangeData({ ...changeData, url: downloadURL });
          });
        }
      );
    };
    image && uploadFile();
  }, [image]);

  const CreatePortfolio = async () => {
    const defaultImage =
      "https://firebasestorage.googleapis.com/v0/b/portfolio-38539.appspot.com/o/portfolio%2Fportfolio.png?alt=media&token=47c29fe8-2d00-46b9-a635-b76a49598e80";
    await addDoc(portCollectionRef, {
      title: changeData.title,
      rating: Number(changeData.rating),
      git_link: changeData.git_link,
      ex_link: changeData.ex_link || " ",
      desc: changeData.desc || " ",
      img: changeData?.url || defaultImage,
    });
    navigate("/list_portfolio");
  };

  const EditPortfolio = async (title, desc, rating, ex_link, git_link, img) => {
    const portCollectionIdRef = doc(db, "portfolio", id);
    await updateDoc(portCollectionIdRef, {
      title: changeData.title || title,
      rating: Number(changeData.rating) || rating,
      git_link: changeData.git_link || git_link,
      ex_link: changeData.ex_link || ex_link,
      desc: changeData.desc || desc,
      img: changeData?.url || img,
    });
    navigate("/list_portfolio");
  };

  const editForm = () => {
    return portData?.map((pd) => {
      return (
        <form
          key={pd.id}
          className="flex flex-col gap-7 justify-center items-center dark:text-custom_dark-secondary text-custom_light-secondary_2 w-3/4 max-w-3xl dark:bg-custom_dark-secondary/30 bg-custom_light-secondary_2/30 p-7 rounded-xl mt-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="title" className="-mb-5 text-white">
            Title*
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={id && pd.title}
            className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
            onChange={(e) =>
              setchangeData({ ...changeData, title: e.target.value })
            }
          />
          <label htmlFor="desc" className="-mb-5 text-white">
            Description
          </label>
          <textarea
            name="desc"
            id="desc"
            cols="60"
            rows="6"
            defaultValue={id && pd.desc}
            onChange={(e) =>
              setchangeData({ ...changeData, desc: e.target.value })
            }
            className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
          ></textarea>
          <label htmlFor="rating" className="-mb-5 text-white">
            Rating*
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
            defaultValue={id && pd.rating}
            onChange={(e) =>
              setchangeData({ ...changeData, rating: e.target.value })
            }
          />
          <label htmlFor="xlink" className="-mb-5 text-white">
            External Link
          </label>
          <input
            type="text"
            name="xlink"
            id="xlink"
            className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
            defaultValue={id && pd.ex_link}
            onChange={(e) =>
              setchangeData({ ...changeData, ex_link: e.target.value })
            }
          />

          <label htmlFor="glink" className="-mb-5 text-white">
            Github Link*
          </label>
          <input
            type="text"
            name="glink"
            id="glink"
            className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
            defaultValue={id && pd.git_link}
            onChange={(e) =>
              setchangeData({ ...changeData, git_link: e.target.value })
            }
          />

          <label className="border p-3 rounded-2xl dark:hover:bg-custom_dark-secondary hover:bg-custom_light-secondary_2 text-white w-5/6">
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="h-0 w-0 opacity-0"
            />
            <span>Upload Image</span>
            {image && (
              <div className="dark:text-custom_dark-secondary text-custom_light-secondary_2">
                {image.name}
                {changeData.url}
              </div>
            )}
          </label>
          {error}
          {progress}
          <input
            type="submit"
            value="Save"
            className="p-3 rounded-2xl dark:bg-custom_dark-secondary dark:hover:bg-custom_dark-secondary/30 bg-custom_light-secondary_2 hover:bg-custom_light-secondary_2/30 text-white w-5/6"
            onClick={() =>
              EditPortfolio(
                pd?.title,
                pd?.desc,
                pd?.rating,
                pd?.ex_link,
                pd?.git_link,
                pd?.img
              )
            }
            disabled={progress !== null && progress < 100}
          />
        </form>
      );
    });
  };

  const createForm = () => {
    return (
      <form
        className="flex flex-col gap-7 justify-center items-center dark:text-custom_dark-secondary text-custom_light-secondary_2 w-3/4 max-w-3xl dark:bg-custom_dark-secondary/30 bg-custom_light-secondary_2/30 p-7 rounded-xl mt-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="title" className="-mb-5 text-white">
          Title*
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
          onChange={(e) =>
            setchangeData({ ...changeData, title: e.target.value })
          }
        />
        <label htmlFor="desc" className="-mb-5 text-white">
          Description
        </label>
        <textarea
          name="desc"
          id="desc"
          cols="60"
          rows="6"
          onChange={(e) =>
            setchangeData({ ...changeData, desc: e.target.value })
          }
          className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
        ></textarea>
        <label htmlFor="rating" className="-mb-5 text-white">
          Rating*
        </label>
        <input
          type="number"
          name="rating"
          id="rating"
          className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
          onChange={(e) =>
            setchangeData({ ...changeData, rating: e.target.value })
          }
        />
        <label htmlFor="xlink" className="-mb-5 text-white">
          External Link
        </label>
        <input
          type="text"
          name="xlink"
          id="xlink"
          className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
          onChange={(e) =>
            setchangeData({ ...changeData, ex_link: e.target.value })
          }
        />

        <label htmlFor="glink" className="-mb-5 text-white">
          Github Link*
        </label>
        <input
          type="text"
          name="glink"
          id="glink"
          className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
          onChange={(e) =>
            setchangeData({ ...changeData, git_link: e.target.value })
          }
        />

        <label className="border p-3 rounded-2xl dark:hover:bg-custom_dark-secondary hover:bg-custom_light-secondary_2 text-white w-5/6 disabled:cursor-not-allowed">
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="h-0 w-0 opacity-0"
          />
          <span>Upload Image</span>
          {image && (
            <div className="dark:text-custom_dark-secondary text-custom_light-secondary_2">
              {image.name}
              {changeData.url}
            </div>
          )}
        </label>
        {progress}
        {error}
        <input
          type="submit"
          value="Save"
          className="p-3 rounded-2xl dark:bg-custom_dark-secondary dark:hover:bg-custom_dark-secondary/30 bg-custom_light-secondary_2 hover:bg-custom_light-secondary_2/30 text-white w-5/6 disabled:cursor-not-allowed"
          onClick={() => CreatePortfolio()}
          disabled={progress !== null && progress < 100}
        />
      </form>
    );
  };

  //back button
  const back = () => {
    return (
      <RouterLink
        to="/list_portfolio"
        className="p-3 px-4 bg-custom_light-secondary_2 hover:bg-custom_light-secondary_2/30 dark:bg-custom_dark-secondary hover:dark:bg-custom_dark-secondary/30 rounded-xl "
      >
        Back
      </RouterLink>
    );
  };
  console.log(changeData);
  return (
    <>
      <NavBar handleTheme={handleTheme} theme={theme} />
      <div className=" font-poppins dark:bg-custom_dark-background bg-custom_light-background  min-h-screen text-white w-full">
        <div className=" pt-24 p-10 flex justify-center items-center flex-col">
          <h3 className="text-center pb-5 text-lg font-bold  ">
            {id ? "Edit Portfolio" : "Create Portfolio"}
          </h3>
          {back()}
          {id ? editForm() : createForm()}
        </div>
      </div>
    </>
  );
};

export default CreatePortfolio;
