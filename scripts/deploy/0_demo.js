const messageBus = {
    '5': '0xF25170F86E4291a99a9A560032Fe9948b8BcFBB2',
    '97': '0xAd204986D6cB67A5Bc76a3CB8974823F43Cb9AAA'
}

module.exports = async ({ getNamedAccounts, getChainId, deployments }) => {
    let chainId = (await getChainId()).toString()
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy('Demo', {
        from: deployer,
        args: [messageBus[chainId]],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};
module.exports.tags = ['Demo'];