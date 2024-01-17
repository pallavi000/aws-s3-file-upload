import React, { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard, ProgressBar, StatusBar } from "@uppy/react";
import AwsS3 from "@uppy/aws-s3";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/status-bar/dist/style.min.css";
import "@uppy/progress-bar/dist/style.min.css";

import axios from "axios";

function UppyComp() {
  const [uppy] = useState(() =>
    new Uppy().use(AwsS3, {
      getUploadParameters(file) {
        return axios
          .get(
            `/file-upload/generate-api/?fileName=${file.name}&fileType=${file.type}`
          )
          .then((response) => {
            return {
              method: "PUT",
              url: response.data,
              fields: [],
            };
          })
          .catch((err) => {
            console.log(err);
          });
      },
    })
  );

  useEffect(() => {
    if (uppy) {
      uppy.on("upload-success", async (file, response) => {
        const data = {
          name: file.name,
        };
        await axios.post("/file-upload/image", data);
      });
    }
  }, [uppy]);

  return (
    <div className="w-2/3 d-flex justify-center items-center h-[400px] ">
      <Dashboard
        uppy={uppy}
        showProgressDetails
        hidePauseResumeButton={false}
        hideCancelButton={false}
        singleFileFullScreen
        width={"100%"}
        style={{ height: "300px" }}
      />
    </div>
  );
}

export default UppyComp;
