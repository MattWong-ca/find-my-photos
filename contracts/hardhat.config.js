require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    "sepolia": {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    "base-sepolia": {
      url: `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 1000000000,
    },
    "polygon-pos": {
      url: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    "zircuit-testnet": {
      url: "https://garfield-testnet.zircuit.com",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    }
  },
  // etherscan: {
  //   apiKey: {
  //     sepolia: process.env.ETHERSCAN_API_KEY,
  //     baseSepolia: process.env.BASESCAN_API_KEY,
  //     polygonMumbai: process.env.POLYGONSCAN_API_KEY,
  //     // Add other API keys as needed
  //   },
  //   customChains: [
  //     {
  //       network: "base-sepolia",
  //       chainId: 84532,
  //       urls: {
  //         apiURL: "https://api-sepolia.basescan.org/api",
  //         browserURL: "https://sepolia.basescan.org"
  //       }
  //     }
  //   ]
  // }
};
