require("@nomiclabs/hardhat-waffle");
require("dotenv").config()
require('hardhat-deploy');
require("@nomiclabs/hardhat-etherscan");

const privateKey = process.env.PRIVATE_KEY ?? "NO_PRIVATE_KEY";
const privateKey2 = process.env.PRIVATE_KEY2 ?? "NO_PRIVATE_KEY2";
const infuraId = process.env.INFURA_ID ?? "INFURA_ID";
const bscScanKey = process.env.BSC_SCAN_KEY ?? "BSC_SCAN_KEY";

const chainIds = {
  goerli: 5,
  'arbitrum-rinkeby': 421611
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function getChainConfig(network) {
  const url = `https://${network}.infura.io/v3/${infuraId}`;
  return {
    accounts: [`${privateKey}`, `${privateKey2}`],
    chainId: chainIds[network],
    url,
  };
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    goerli: getChainConfig('goerli'),
    goerli2: getChainConfig('goerli'),
    bscTest: {
      url: 'https://bsc-testnet.nodereal.io/v1/60abea8408e44c1282428c2343b4e1d8',
      accounts: [`${privateKey}`, `${privateKey2}`],
      chainId: 97,
    },
    bscTest2: {
      url: 'https://bsc-testnet.nodereal.io/v1/60abea8408e44c1282428c2343b4e1d8',
      accounts: [`${privateKey}`, `${privateKey2}`],
      chainId: 97,
    },
    bscTestnet: {
      url: 'https://bsc-testnet.nodereal.io/v1/60abea8408e44c1282428c2343b4e1d8',
      accounts: [`${privateKey}`, `${privateKey2}`],
      chainId: 97,
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deploy: "./scripts/deploy",
    deployments: "./deployments",
  },
  namedAccounts: {
    deployer: 0
  },
  etherscan: {
    apiKey: {
      bscTestnet: bscScanKey,
    }
  }
};
