require("@nomiclabs/hardhat-waffle");
require("dotenv").config()
require('hardhat-deploy');

const privateKey = process.env.PRIVATE_KEY ?? "NO_PRIVATE_KEY";
const infuraId = process.env.INFURA_ID ?? "INFURA_ID";

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
    accounts: [`${privateKey}`],
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
    arbTest: getChainConfig('arbitrum-rinkeby')
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
  }
};
