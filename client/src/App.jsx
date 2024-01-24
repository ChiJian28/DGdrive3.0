import React, { useEffect, useState } from 'react';
import Display from './components/Display';
import FileUpload from './components/FileUpload';
import Modal from './components/Modal';
import { ethers } from "ethers"
import abi from "./abi/Upload.json"
import { useSnackbar } from "notistack";

const App = () => {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
    const contractABI = abi.abi;

    const loadProvider = async () => {
      if (provider) {
        // handle when user change network
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        
        // handle when user change account(metamask)
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        enqueueSnackbar('Metamask is not installed', { variant: 'error' });
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      {!modalOpen && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setModalOpen(true)}
        >
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
      <div className="bg-[#d2ebf3] min-h-screen p-8 flex flex-col">
        <div>
          <h1 className="text-3xl font-bold mb-4">GDrive 3.0</h1>
          <p className="mb-4 overflow-auto max-w-full">
            Account: {account ? account : "Not connected"}
          </p>
        </div>
        <div>
          <FileUpload
            account={account}
            provider={provider}
            contract={contract}
          ></FileUpload>
          <Display contract={contract} account={account}></Display>
        </div>
      </div>
    </>
  )
}

export default App