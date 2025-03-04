require("@nomicfoundation/hardhat-toolbox");

const privateKey = "PRIVATE_KEY";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "sepolia",
  networks: {
  hardhat: {
    },
  sepolia: {
    url: "https://sepolia.infura.io/v3/<key>",
    accounts: [privateKey]
    }
  }
};
