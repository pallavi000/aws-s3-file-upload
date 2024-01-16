import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState();

  async function uploadFile(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    const response = await axios.post(
      "http://localhost:5000/api/file-upload/files",
      data
    );
    console.log(response.data);
  }

  return (
    <>
      <h3>File Upload</h3>
      <form onSubmit={uploadFile}>
        <input
          type="file"
          required
          onChange={(e) => setFile(e.target.files[0])}
        ></input>
        <button type="submit">File Upload</button>
      </form>
    </>
  );
}

export default App;
