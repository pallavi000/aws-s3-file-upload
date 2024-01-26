import { useState } from "react";
import UppyComp from "./pages/UppyComp";
import FileUpload from "./pages/FileUpload";
import ImagesList from "./pages/ImagesList";
import axios from "axios";

axios.defaults.baseURL = "http://3.67.202.173/api";

function App() {
  const [currentComponent, setCurrentComponent] = useState("image");
  return (
    <>
      <h4 className="text-center text-lg font-medium mt-8">AWS image upload</h4>
      <hr />
      <div className="flex gap-3 justify-center m-12">
        <button
          type="button"
          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50"
          disabled={currentComponent === "image" ? true : false}
          onClick={() => setCurrentComponent("image")}
        >
          Image List
        </button>

        <button
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50"
          disabled={currentComponent === "basic" ? true : false}
          onClick={() => setCurrentComponent("basic")}
        >
          Basic Upload
        </button>
        <button
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50"
          disabled={currentComponent === "customize" ? true : false}
          onClick={() => setCurrentComponent("customize")}
        >
          Customize Upload
        </button>
      </div>
      <div className=" flex justify-center items-center">
        {currentComponent === "image" ? (
          <ImagesList />
        ) : currentComponent === "basic" ? (
          <FileUpload />
        ) : (
          <UppyComp />
        )}
      </div>
    </>
  );
}

export default App;
