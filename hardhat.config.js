require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {    // to verify contract in CLI way（也有GUI的，可以在etherscan ui 那边进行verify，只不过CLI 比较方便 一行command 解决）
    apiKey: process.env.ETHERSCAN_API_KEY,
  }
};