import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";

const Modal = ({ setModalOpen, contract }) => {
    const [addressInput, setAddressInput] = useState(""); // State to manage input value
    const [addressList, setAddressList] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    const sharing = async () => {
        try {
            if (addressInput) {
                await contract.allow(addressInput);
                enqueueSnackbar('Share successfully', { variant: 'success' });
                setModalOpen(false);
            } else {
                enqueueSnackbar('Please enter the address', { variant: 'error' });
                return;
            }
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Share failed', { variant: 'error' });
            setModalOpen(false);
        }
    };

    useEffect(() => {
        const accessList = async () => {
            const list = await contract.shareAccess();
            setAddressList(list);
        };
        contract && accessList();
    }, [contract]);

    return (
        <>
            <div className="modalBackground fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="modalContainer bg-white p-8 rounded-lg">
                    <div className="title text-2xl font-bold mb-4">Share with</div>
                    <div className="body mb-4">
                        <input
                            type="text"
                            className="address border rounded p-2 w-full"
                            placeholder="Enter Address"
                            value={addressInput}
                            onChange={(e) => setAddressInput(e.target.value)}
                        />
                    </div>
                    <form id="myForm">
                        <select id="selectNumber" className="address border rounded p-2 w-full">
                            <option className="address">People With Access</option>
                            {addressList.map((opt, i) => (
                                <option key={i} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </form>
                    <div className="footer mt-4 flex justify-end">
                        <button
                            onClick={() => {
                                setModalOpen(false);
                            }}
                            className="cancelBtn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={sharing}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Share
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Modal;
