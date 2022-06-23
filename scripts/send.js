const hre = require("hardhat");
const { deployments, ethers } = hre;
const { BigNumber } = ethers;
const abiCoder = ethers.utils.defaultAbiCoder;
const zeroAddress = ethers.constants.AddressZero

const chainId = {
  goerli: 5,
  'bscTest': 97
}

async function main() {
  //test sender in goerli
  const senderAddress = (await deployments.get('Demo')).address;
  console.log("senderAddress: ", senderAddress);
  const Sender = await ethers.getContractFactory("Demo");
  const sender = Sender.attach(senderAddress);

  let _token = '0xf4B2cbc3bA04c478F0dC824f4806aC39982Dce73' //goerli cbrige usdt
  let _amount = BigNumber.from(10).pow(6).mul(101)

  const erc20 = await ethers.getContractAt("IERC20", _token);
  const [account] = await ethers.getSigners()

  let balance = await erc20.balanceOf(account.address);
  console.log("balance1: ", balance.toString());

  await erc20.approve(senderAddress, _amount);

  //bscTest Demo
  let _receiver = '0x6497231b99f0fC16C94eADC6bfC1a43a43C6bc00'
  let _dstChainId = chainId.bscTest
  let _maxSlippage = 50000   //5%

  let fee = (await sender.getFee([1, true, zeroAddress, '0x', zeroAddress, _maxSlippage, account.address]))[0];
  console.log("fee: ", fee.toString());

  //BridgeSendType.Liquidity = 1
  // let transferId = await sender.callStatic.getLiquidityTransferId(_receiver, _token, _amount, _dstChainId, _nonce);
  // console.log("transferId: ", transferId);

  let data = await sender.send(_receiver, _token, _amount, _dstChainId, _maxSlippage, zeroAddress, '0x', zeroAddress, { value: fee });
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

async function getCurrentTime() {
  const blockNum = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNum);
  return block.timestamp;
}
