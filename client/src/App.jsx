import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";

function App() {
  const [file, setFile] = useState();

  async function uploadFile(e) {
    try {
      e.preventDefault();
      const response = await axios.get(
        "http://localhost:5000/api/file-upload/generate-api"
      );
      const result = await axios.put(response.data, file);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="d-flex mx-auto justify-center align-middle h-['100vh'] w-['100vh']">
      <form className="w-1/2" onSubmit={uploadFile}>
        <label
          htmlFor="cover-photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          File Upload
        </label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <PhotoIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
        <button className=" bg-green-200 px-8 py-3 text-lg d-flex justify-center">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
