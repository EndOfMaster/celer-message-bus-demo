const goerliMessageBus = '0xF25170F86E4291a99a9A560032Fe9948b8BcFBB2'

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy('Sender', {
        from: deployer,
        args: [goerliMessageBus],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};
module.exports.tags = ['Sender'];