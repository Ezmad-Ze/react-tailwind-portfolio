import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { db, storage } from "../firebaseConfig";
import NavBar from "./NavBar";

function CreateSpecial() {
  const specCollectionRef = collection(db, "special");
  
  const { theme, handleTheme } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);
  const [downloadImages, setDownloadImages] = useState([]);
  const [specData, setSpecData] = useState({});
  const [updateData, setUpdateData] = useState([]);

  {
    id &&
      useEffect(() => {
        const specCollectionIdRef = doc(db, "special", id);
        onSnapshot(specCollectionIdRef, (doc) => {
          console.log(doc.data().url);
          setDownloadImages(doc.data().url);
          setUpdateData([{ ...doc.data(), id: doc.id }]);
        });
      }, []);
  }

  //select file
  const onSelect = (e) => {
    const selected = e.target.files;
    const selectedToArray = Array.from(selected);

    setSelectedImages((prev) => prev.concat(selectedToArray));
    e.target.value = "";
  };

  const uploadFile = (e) => {
    selectedImages.map((image) => {
      const name = image.name + new Date().getTime();
      const storageRef = ref(storage, "special/" + name);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setDownloadImages((prev) => prev.concat(downloadURL));
          });
        }
      );
    });
    setSelectedImages([]);
  };

  const deleteImage = (image) => {
    // Create a reference to the file to delete
    const imageRef = ref(storage, image);

    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        alert("Deleted");
        setDownloadImages(downloadImages.filter((e) => e !== image));
      })
      .catch((error) => {
        alert(error);
      });
  };

  //back button
  const back = () => {
    return (
      <RouterLink
        to="/list_special"
        className="p-3 px-4 bg-custom_light-secondary_2 hover:bg-custom_light-secondary_2/30 dark:bg-custom_dark-secondary hover:dark:bg-custom_dark-secondary/30 rounded-xl "
      >
        Back
      </RouterLink>
    );
  };

  //create list
  const createSpec = async () => {
    await addDoc(specCollectionRef, {
      name: specData.name,
      url: downloadImages,
    });
    navigate("/list_special");
  };

  //update list
  const updateSpec = async (name) => {
    const specCollectionIdRef = doc(db, "special", id);
    await updateDoc(specCollectionIdRef, {
      name: specData.name || name,
      url: downloadImages,
    });
    navigate("/list_special");
  };

  const createForm = () => {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-7 justify-center items-center dark:text-custom_dark-secondary text-custom_light-secondary_2 md:w-3/4 w-full  max-w-3xl dark:bg-custom_dark-secondary/30 bg-custom_light-secondary_2/30 p-7 rounded-xl mt-3"
      >
        <label htmlFor="special" className="text-white">
          Special
        </label>
        <input
          type="text"
          name="special"
          id="special"
          className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
          placeholder="Insert the Technology"
          onChange={(e) => setSpecData({ ...specData, name: e.target.value })}
        />
        <label
          htmlFor="upload"
          className=" text-white w-5/6 flex justify-between"
        >
          <div className="border p-3 rounded-2xl flex gap-3 cursor-pointer dark:hover:bg-custom_dark-secondary hover:bg-custom_light-secondary_2">
            <input
              type="file"
              name="upload"
              id="upload"
              multiple
              accept="image/*"
              className="h-0 w-0 opacity-0"
              onChange={onSelect}
            />
            <span>Upload Images {selectedImages.length}</span>
          </div>

          <button
            onClick={uploadFile}
            className="ml-5 dark:hover:bg-custom_dark-secondary hover:bg-custom_light-secondary_2"
          >
            Submit Images
          </button>
        </label>
        <input
          type="submit"
          value="Submit"
          className="cursor-pointer text-white hover:text-custom_light-secondary_2 hover:dark:text-custom_dark-secondary"
          onClick={createSpec}
        />
      </form>
    );
  };

  const updateForm = () => {
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-7 justify-center items-center dark:text-custom_dark-secondary text-custom_light-secondary_2 md:w-3/4 w-full  max-w-3xl dark:bg-custom_dark-secondary/30 bg-custom_light-secondary_2/30 p-7 rounded-xl mt-3"
      >
        <label htmlFor="special" className="text-white">
          Special
        </label>
        {updateData.map((d) => {
          return (
            <input
              key={d.id}
              type="text"
              name="special"
              id="special"
              className="p-3 pl-6 rounded-xl focus:outline-none w-5/6"
              placeholder="Insert the Technology"
              defaultValue={d.name}
              onChange={(e) =>
                setSpecData({ ...specData, name: e.target.value })
              }
            />
          );
        })}

        <label
          htmlFor="upload"
          className=" text-white w-5/6 flex justify-between"
        >
          <div className="border p-3 rounded-2xl flex gap-3 cursor-pointer dark:hover:bg-custom_dark-secondary hover:bg-custom_light-secondary_2">
            <input
              type="file"
              name="upload"
              id="upload"
              multiple
              accept="image/*"
              className="h-0 w-0 opacity-0"
              onChange={onSelect}
            />
            <span>Upload Images {selectedImages.length}</span>
          </div>

          <button
            onClick={uploadFile}
            className="ml-5 dark:hover:bg-custom_dark-secondary hover:bg-custom_light-secondary_2"
          >
            Submit Images
          </button>
        </label>
        {updateData.map((d) => {
          return (
            <input
              key={d.id}
              type="submit"
              value="Update"
              className="cursor-pointer text-white hover:text-custom_light-secondary_2 hover:dark:text-custom_dark-secondary"
              onClick={() => {
                updateSpec(d.name);
              }}
            />
          );
        })}
      </form>
    );
  };

  return (
    <>
      <NavBar handleTheme={handleTheme} theme={theme} />
      <div className=" font-poppins dark:bg-custom_dark-background bg-custom_light-background  min-h-screen text-white w-full">
        <div className=" pt-24 p-10 flex justify-center items-center flex-col">
          <h3 className="text-center pb-5 text-lg font-bold  ">
            {id ? "Edit Specialization" : "Create Specialization"}
          </h3>
          {back()}
          {id ? updateForm() : createForm()}
          {downloadImages.map((image, index) => {
            return (
              <div key={index} className="mt-4">
                <img src={image} height="200" width="150" alt="upload" />
                <button onClick={() => deleteImage(image)}>Delete Image</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CreateSpecial;
