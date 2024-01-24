import React, { useState } from "react";
import { useSnackbar } from "notistack";

const Display = ({ contract, account }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [otherAddress, setOtherAddress] = useState(""); // State to manage the input value

  const getdata = async () => {
    let dataArray;
    try {
      if (otherAddress) {
        dataArray = await contract.display(otherAddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (error) {
      enqueueSnackbar("You don't have access", { variant: 'error' });
      console.error(error);
    }
    const isEmpty = dataArray.length === 0;

    if (!isEmpty) {
      setData(dataArray);
      enqueueSnackbar('Get Image successfully', { variant: 'success' });
    } else {
      enqueueSnackbar('No image to display', { variant: 'info' });
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Enter Address"
        value={otherAddress}
        onChange={(e) => setOtherAddress(e.target.value)}
        className="address border rounded p-2 mb-4 mr-4 md:w-[300px] xl:w-[500px]"
      />
      <button
        className="center button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={getdata}
      >
        Get Data
      </button>
      <div className="flex flex-col flex-grow md:flex-row justify-between flex-wrap md:p-4">
        {data?.map((item, index) => (
          <div key={index} className="mb-4 w-[330px] h-[200px]">
            <img
              crossOrigin="anonymous"
              src={`https://gateway.pinata.cloud/ipfs/${item}`}
              alt="new images"
              className="rounded-lg shadow-md h-full w-full object-fill"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Display;
