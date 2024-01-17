import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);

  async function uploadFile(e) {
    setIsUploading(true);
    try {
      const data = {
        name: file.name,
      };
      e.preventDefault();
      //generate s3 upload url
      const response = await axios.get(
        `/file-upload/generate-api/?fileName=${file.name}&fileType=${file.type}`
      );
      console.log(response.data);

      //upload to s3
      const result = await axios.put(response.data, file);
      console.log(result);

      // save data in db
      await axios.post("/file-upload/image", data);
    } catch (error) {
      console.log(error);
    }
    setIsUploading(false);
  }

  return (
    <div className="mx-auto ">
      <form className="" onSubmit={uploadFile}>
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
                  required
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
        {isUploading ? (
          <button
            type="button"
            disabled
            className="py-2.5 px-10 me-2 mb-2 text-sm  font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex mx-auto my-4"
          >
            Uploading
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-gradient-to-r  from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2 flex mx-auto my-4 "
          >
            Upload
          </button>
        )}
      </form>
    </div>
  );
}

export default FileUpload;
