const hre = require("hardhat");
const { deployments, ethers } = hre;

const chainId = {
  goerli: 5,
  'arbitrum-rinkeby': 421611
}

async function main() {
  //test recipient in arb test
  const recipientAddress = (await deployments.get('Recipient')).address;
  console.log("recipientAddress: ", recipientAddress);
  const Recipient = await ethers.getContractFactory("Recipient");
  const recipient = Recipient.attach(recipientAddress);

  const data = await recipient.getSendMessage();
  console.log(data);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
