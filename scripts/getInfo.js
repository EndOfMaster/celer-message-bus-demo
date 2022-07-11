const hre = require("hardhat");
const { deployments, ethers } = hre;
const { BigNumber } = ethers;

async function main() {
  const demoAddress = (await deployments.get('Demo')).address;
  console.log("demoAddress: ", demoAddress);
  const Demo = await ethers.getContractFactory("Demo");
  const demo = Demo.attach(demoAddress);

  let transfer = await demo.transfer();
  console.log("transfer: ", transfer);

  let transfer2 = await demo.transfer2();
  console.log("transfer2: ", transfer2);

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