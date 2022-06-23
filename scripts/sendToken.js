const hre = require("hardhat");
const { deployments, ethers } = hre;
const { BigNumber } = ethers;

async function main() {
  const demoAddress = (await deployments.get('Demo')).address;
  const [account] = await ethers.getSigners()

  let amount = BigNumber.from(10).pow(18).div(1000)
  await sendEth(account, demoAddress, amount)
  console.log("send token done");
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