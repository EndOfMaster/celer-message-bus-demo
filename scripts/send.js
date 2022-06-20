const hre = require("hardhat");
const { deployments, ethers } = hre;
const { BigNumber } = ethers;

const chainId = {
  goerli: 5,
  'bscTest': 97
}

async function main() {
  //test sender in goerli
  const senderAddress = (await deployments.get('Sender')).address;
  console.log("senderAddress: ", senderAddress);
  const Sender = await ethers.getContractFactory("Sender");
  const sender = Sender.attach(senderAddress);

  let _token = '0xf4B2cbc3bA04c478F0dC824f4806aC39982Dce73' //goerli cbrige usdt
  let _amount = BigNumber.from(10).pow(6).mul(101)

  const erc20 = await ethers.getContractAt("IERC20", _token);
  await erc20.approve(senderAddress, _amount);

  let dataAmount = ethers.utils.parseEther('1000')

  let fee = (await sender.getFee(dataAmount))[0];
  console.log("fee: ", fee.toString());

  //bscTest Recipient
  let _receiver = '0x0A92953caa6283956d32d0Fd1f057cB328389c55'
  let _dstChainId = chainId.bscTest
  let _maxSlippage = 50000   //5%
  let _nonce = await getCurrentTime()

  //BridgeSendType.Liquidity = 1
  let transferId = await sender.callStatic.getLiquidityTransferId(_receiver, _token, _amount, _dstChainId, _nonce);
  console.log("transferId: ", transferId);

  let data = await sender.send(_receiver, _token, _amount, _dstChainId, _nonce, _maxSlippage, dataAmount, { value: fee });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function getCurrentTime() {
  const blockNum = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNum);
  return block.timestamp;
}
