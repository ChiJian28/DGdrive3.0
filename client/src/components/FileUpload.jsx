import { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const { enqueueSnackbar } = useSnackbar();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // IPFS 是分布式的，so cannot delete once uploaded
        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "pinata_api_key": import.meta.env.VITE_PINATA_API_KEY,
              "pinata_secret_api_key": import.meta.env.VITE_PINATA_SECRET_KEY,
            },
          }
        );
        contract.add(account, resFile.data.IpfsHash);
        enqueueSnackbar('Successfully Image Uploaded', { variant: 'success' });
        setFileName("No image selected");
        setFile(null);
      } catch (error) {
        enqueueSnackbar('Unable to upload image to Pinata', { variant: 'error' });
        console.error(error);
      }
    } else {
      enqueueSnackbar('No image selected', { variant: 'error' });
      return;
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];   // array-like object, so using [] to access obj's value
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="p-8">
    <form className="form flex flex-col items-center" onSubmit={handleSubmit}>
      <label
        htmlFor="file-upload"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mb-4"
      >
        Choose Image
      </label>
      <input
        disabled={!account}
        type="file"
        id="file-upload"
        name="data"
        onChange={retrieveFile}
        className="hidden"
      />
      <span className="textArea text-gray-700 mb-4">
        Image: {fileName}
      </span>
      <button
        type="submit"
        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
          account ? '' : 'cursor-not-allowed opacity-50'
        }`}
        disabled={!account}
      >
        Upload File
      </button>
    </form>
  </div>
  );
};
export default FileUpload;