const arbTestMessageBus = '0x7d43AABC515C356145049227CeE54B608342c0ad'

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy('Recipient', {
        from: deployer,
        args: [arbTestMessageBus],
        log: true,
        skipIfAlreadyDeployed: true,
    });
};
module.exports.tags = ['Recipient'];