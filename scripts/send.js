const hre = require("hardhat");
const { deployments, ethers } = hre;
const { BigNumber } = ethers;
const abiCoder = ethers.utils.defaultAbiCoder;
const zeroAddress = ethers.constants.AddressZero

const chainId = {
  goerli: 5,
  bscTest: 97
}

async function main() {
  //test demo in goerli
  const demoAddress = (await deployments.get('Demo')).address;
  console.log("demoAddress: ", demoAddress);
  const Demo = await ethers.getContractFactory("Demo");
  const demo = Demo.attach(demoAddress);

  let _token = '0xf4B2cbc3bA04c478F0dC824f4806aC39982Dce73' //goerli cbrige usdt
  let _amount = BigNumber.from(10).pow(6).mul(101)

  const erc20 = await ethers.getContractAt("IERC20", _token);
  const [account, account2] = await ethers.getSigners()

  let balance = await erc20.balanceOf(account2.address);
  console.log("balance1: ", balance.toString());

  await (await erc20.connect(account2).approve(demoAddress, _amount)).wait();

  //bscTest Demo
  let _receiver = '0x60c60040f64Bff7698645c821C960d05E34b6526'
  let _dstChainId = chainId.bscTest
  let _maxSlippage = 50000   //5%

  let fee = (await demo.getFee([true, _maxSlippage, account.address]))[0];
  console.log("fee: ", fee.toString());

  //BridgeSendType.Liquidity = 1
  // let transferId = await demo.callStatic.getLiquidityTransferId(_receiver, _token, _amount, _dstChainId, _nonce);
  // console.log("transferId: ", transferId);

  let data = await demo.connect(account2).send(_receiver, _token, _amount, _dstChainId, _maxSlippage, { value: fee });
  let events = (await data.wait()).events;
  console.log(events[events.length - 1].data);
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
