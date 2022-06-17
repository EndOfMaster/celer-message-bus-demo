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

  let _token = '0x5D3c0F4cA5EE99f8E8F59Ff9A5fAb04F6a7e007f' //goerli celr

  const erc20 = await ethers.getContractAt("IERC20", _token);
  await erc20.approve(senderAddress, ethers.constants.MaxUint256);

  let dataAmount = ethers.utils.parseEther('1000')

  let fee = await sender.getFee(dataAmount);
  console.log("fee: ", fee.toString());

  //arbTest Recipient
  let _receiver = '0x6497231b99f0fC16C94eADC6bfC1a43a43C6bc00'
  let _amount = ethers.utils.parseEther('100')
  let _dstChainId = chainId["arbitrum-rinkeby"]
  let _maxSlippage = 50000   //5%

  await sender.send(_receiver, _token, _amount, _dstChainId, _maxSlippage, dataAmount);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
