const messageBus = {
    '5': '0xF25170F86E4291a99a9A560032Fe9948b8BcFBB2',
    '421611': '0x7d43AABC515C356145049227CeE54B608342c0ad'
}

module.exports = async ({ getNamedAccounts, getChainId, deployments }) => {
    let chainId = (await getChainId()).toString()
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy('Recipient', {
        from: deployer,
        args: [messageBus[chainId]],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};
module.exports.tags = ['Recipient'];