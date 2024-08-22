import { useState, useEffect } from "react";
import FormData from 'form-data';
import axios from "axios";
// import { useToast } from "@/components/ui/use-toast"
import Sidebar from "../Sidebar/Sidebar";


function Dashboard() {
  //information..

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState();

  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
  const [title, setTitle] = useState();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (storedName && storedEmail) {
      setUsername(storedName);
      setEmail(storedEmail);
    }
  }, []);

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
  }
  const handleChange = (e: any) => {
    const data = e.target.files[0];
    setFile(data);
  }

  // Handle file upload
  const upload = async (e: any) => {
    e.preventDefault();
    if (!file) {
      console.error("No files or title selected.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("screenshot", file);

      const response = await axios.post("http://localhost:8800/send/random", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const data = await response.data;
        const { uploadPath } = data;
        const uniqueTimestamp = new Date().getTime(); // Get a unique timestamp
        setUploadStatus("Upload Successful!");
        setUploadedVideoUrl(`http://localhost:8800/prapt/${uploadPath}?${uniqueTimestamp}`);
        console.log(`New upload path: ${uploadPath}`);
      } else {
        setUploadStatus("Error While file uploading");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };


  return (
    <>
      <div className="grid gap-4 m-4 sm:grid-cols-12">
        <div className="sm:col-span-2 bg-black">
          {/* Sidebar */}
          <Sidebar />
          1
        </div>
        <div className="sm:col-span-10">
          {/* informtion start */}

          <p>Username : {username}</p>
          <p>Email : {email}</p>

          {/* informtion end */}


          {/* Pannel start */}

          {/* File upload start */}
          <div className="flex items-center justify-center w-full mt-5">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 16" stroke="currentColor">
                  {/* SVG path here */}
                  hhds
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-900 font-bold dark:text-gray-400">
                  {file ? 'File has been selected' : 'No file selected'}
                </p>
              </div>
              <input id="dropzone-file" type="file" accept="video/*" name="screenshot" onChange={handleChange} className="hidden" />
            </label>
          </div>
          {/* File upload end */}

          {/* Submit button start */}
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
              onClick={upload}
            >
              Submit
            </button>
          </div>
          {/* Submit button end */}
          <div className="ml-7">

            {uploadStatus && (
              <div className="mt-4">

                <div className="border-red-500">
                  23jd
                </div>

                <div>
                  {uploadedVideoUrl && (
                    <video
                      key={uploadedVideoUrl}
                      width="320"
                      height="240"
                      controls
                      muted
                      autoPlay
                      className="mt-4  transition duration-300 ease-in-out"
                    >
                      <source src={uploadedVideoUrl} type="video/mp4" />
                    </video>
                  )}
                </div>
                {uploadedVideoUrl && (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-5 rounded focus:outline-none focus:shadow-outline"
                  // onClick={}
                  >
                    Play : 
                  </button>
                )}
              </div>
            )}

          </div>




        </div>
      </div>
    </>
  );
}

export default Dashboard;
