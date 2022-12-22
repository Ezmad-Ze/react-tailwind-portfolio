import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { db, storage } from "../firebaseConfig";
import { ThemeContext } from "../context/ThemeContext";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function EditCV() {
  const { theme, handleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const cvCollectionRef = collection(db, "cv");

  const [file, setFile] = useState("");
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [descriptions, setDescriptions] = useState({ desc1: "", desc2: "" });
  
  //load data
  useEffect(() => {
    const getData = async () => {
      const res = await getDocs(cvCollectionRef);
      setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);


  //upload data onload
  useEffect(() => {
    const uploadFile = () => {
      const name = file.name + new Date().getTime();
      const storageRef = ref(storage, "cv_file/" + name);
      const uploadTask = uploadBytesResumable(storageRef, file);

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
            setUrl(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  
  const handleUpdate = async (id, desc_1, desc_2, cvFile) => {
    const cvDoc = doc(db, "cv", id);
    await updateDoc(cvDoc, {
      desc_1: descriptions.desc1 == "" ? desc_1 : descriptions.desc1,
      desc_2: descriptions.desc2 == "" ? desc_2 : descriptions.desc2,
      cv_file: url == "" ? cvFile : url,
    });
    navigate("/edit");
  };

  // back to home
  const back = () => {
    return (
      <RouterLink
        to="/edit"
        className="border p-3 w-8/12 self-center rounded-xl dark:bg-custom_dark-secondary bg-custom_both-custom_button hover:bg-custom_both-custom_button/80 hover:dark:bg-custom_dark-secondary/80 text-center"
      >
        Back to Home
      </RouterLink>
    );
  };

  return (
    <>
      <NavBar handleTheme={handleTheme} theme={theme} />
      <div className=" font-poppins dark:bg-custom_dark-background bg-custom_light-background  min-h-screen text-white flex items-center justify-center p-5">
        {data.map((d) => {
          return (
            <div
              className=" pt-24 p-10 w-11/12 max-w-3xl mt-20 bg-custom_light-large_text/20 rounded-lg"
              key={d?.id}
            >
              <h3 className="text-center pb-5 text-lg font-bold -mt-12">
                Edit CV
              </h3>
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <label htmlFor="desc_1">Description 1*</label>
                <textarea
                  name="desc_1"
                  id="desc_1"
                  cols="60"
                  rows="6"
                  defaultValue={d?.desc_1}
                  onChange={(e) =>
                    setDescriptions({ ...descriptions, desc1: e.target.value })
                  }
                  className="dark:text-custom_dark-secondary text-custom_light-secondary_2 p-3"
                ></textarea>
                <label htmlFor="desc_2">Description 2*</label>

                <textarea
                  name="desc_2"
                  id="desc_2"
                  cols="60"
                  rows="6"
                  defaultValue={d?.desc_2}
                  onChange={(e) =>
                    setDescriptions({ ...descriptions, desc2: e.target.value })
                  }
                  className="dark:text-custom_dark-secondary text-custom_light-secondary_2 p-3"
                ></textarea>
                <label className="border p-3 rounded-2xl dark:hover:bg-custom_dark-secondary hover:bg-custom_light-secondary_2">
                  <input
                    type="file"
                    name="cv"
                    id="cv"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="h-0 w-0 opacity-0"
                  />
                  <span>Upload CV</span>
                  {file && (
                    <div className="dark:text-custom_dark-secondary text-custom_light-secondary_2">
                      {file.name}
                    </div>
                  )}
                </label>

                <div className="text-xs">
                  <div className="dark:text-custom_dark-secondary text-custom_light-secondary_2">
                    {error}
                    {progress == 100 ? "" : progress}%
                    {url}
                  </div>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  onClick={() =>
                    handleUpdate(d?.id, d?.desc_1, d?.desc_2, d?.cv_file)
                  }
                  className={`border p-3 w-8/12 self-center rounded-xl dark:bg-custom_dark-secondary bg-custom_both-custom_button hover:bg-custom_both-custom_button/80 hover:dark:bg-custom_dark-secondary/80 disabled:cursor-not-allowed`}
                  disabled={file && progress < 100 && url === ""}
                />
                {back()}
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default EditCV;
