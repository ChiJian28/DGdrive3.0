// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");   //fetching bytecode and ABI
  const upload = await Upload.deploy();  //creating an instance of our smart contract 

  await upload.waitForDeployment();  // deploying our smart contract

  console.log(`Deployed contract address: ${await upload.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
