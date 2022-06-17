const hre = require("hardhat");
const { deployments, ethers } = hre;

const chainId = {
  goerli: 5,
  'arbitrum-rinkeby': 421611
}

async function main() {
  //test sender in goerli
  const senderAddress = (await deployments.get('Sender')).address;
  console.log("senderAddress: ", senderAddress);
  const Sender = await ethers.getContractFactory("Sender");
  const sender = Sender.attach(senderAddress);

  const transfer2 = await sender.transfer2();
  console.log("transfer2: ", transfer2);

  const transfer1 = await sender.transfer();
  console.log("transfer1: ", transfer1);

  let dataAmount = ethers.utils.parseEther('1000')
  let fee = await sender.getFee(dataAmount);
  console.log("fee: ", fee[0].toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
