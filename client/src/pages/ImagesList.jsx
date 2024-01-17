import axios from "axios";
import { useState, useEffect } from "react";

function ImagesList() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    try {
      const response = await axios.get("/file-upload/image");
      setImages(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center gap-4 flex-wrap">
      {images.map((image) => {
        return (
          <div key={image._id}>
            <img src={image.image} className=" h-36" />
            <h6 className=" text-lg">{image.name}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default ImagesList;
