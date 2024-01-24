# Decentralized Image Upload and Sharing
This project simplifies the decentralized process of uploading and sharing images on the blockchain. It utilizes Solidity for the smart contract and React for the front-end interface. The system allows users to securely upload images to IPFS (InterPlanetary File System) and share access with specified users through the functionality of smart contracts.

## Technologies Used
Remix IDE + Hardhat + Ethers.js + React
* Frontend - React, Ethers.js
* Backend - Solidity, Hardhat (deployed on blockchain)
* Database - [IPFS](https://docs.ipfs.tech/concepts/) (data stored on IPFS to reduce high gas fees)
<br/>
<img width="650" alt="IPFS" src="https://github.com/ChiJian28/DGdrive3.0/assets/109941092/2a35ef1a-e6c3-4544-a236-f1c680cee623">
<br/>
<br/>
<br/>
<br/>
solidity - 0.8.17 
<br/>
ethers.js - 5.6.1
<br/>
hardhat - 2.19.4


## Features
* **Decentralized Storage:** Uploaded to IPFS, images are stored in a decentralized and immutable manner.
* **Smart Contract:** Solidity smart contracts on the Ethereum blockchain are employed for managing ownership and access control.
* **Access Control:** Users have the ability to grant or revoke access to their uploaded images for specific individuals via the smart contract.


## How it Works

1. **Metamask Installation:** Ensure Metamask is installed and configured in your browser for Ethereum interactions.

2. **Contract Address Update:** After deploying the smart contract, remember to update the contract address in the App.js file within the React application.

3. **Image Upload before "Get Data":** Prior to clicking "Get Data," ensure that you have uploaded an image on Pinata. Otherwise, an error will occur stating "You don't have access."

4. **Accessing Other Users' Images:** Utilize the "Get Data" button to access images of other users. Enter the user's address in the provided box, but keep in mind that you can only access their images if they have granted you access through the smart contract. Otherwise, an error will be displayed saying "You don't have access."


## Demo
https://github.com/ChiJian28/DGdrive3.0/assets/109941092/5f643bae-d5bd-4964-b490-dc38a0df5014

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).

## Summary
👉 If you like this project, give it a star ✨ and share 👨🏻‍💻 it to your friends 👈  
