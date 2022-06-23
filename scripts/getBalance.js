const hre = require("hardhat");
const { deployments, ethers } = hre;
const { BigNumber } = ethers;

async function main() {
  let _token = '0xf4B2cbc3bA04c478F0dC824f4806aC39982Dce73' //goerli cbrige usdt

  const erc20 = await ethers.getContractAt("IERC20", _token);
  const [account] = await ethers.getSigners()

  let balance = await erc20.balanceOf(account.address);
  console.log("balance: ", balance.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function sendEth(account, to, amount) {
  await account.sendTransaction({
    to: to,
    value: amount
  });
}