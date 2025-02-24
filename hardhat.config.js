require("@nomicfoundation/hardhat-toolbox");

const privateKey = "ddf8b628eec1be234a083c2fe97d303961bf291f5d194f86b4e79836b2d42a94";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "sepolia",
  networks: {
  hardhat: {
    },
  sepolia: {
    url: "https://sepolia.infura.io/v3/cdb76b86ed444a33891442a4ebb8ad7b",
    accounts: [privateKey]
    }
  }
};