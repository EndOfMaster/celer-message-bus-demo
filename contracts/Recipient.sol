//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

contract Recipient {
    address public immutable messageBus;

    uint256 public a;

    modifier onlyMessageBus() {
        require(msg.sender == messageBus, "caller is not message bus");
        _;
    }

    constructor(address _messageBus) {
        messageBus = _messageBus;
    }

    function executeMessageWithTransfer(
        address, /*_sender*/
        address, /*_token*/
        uint256, /*_amount*/
        uint64, /*_srcChainId*/
        bytes memory _data, /*_message*/
        address /*_executor*/
    ) external onlyMessageBus {
        a = abi.decode(_data, (uint256));
    }
}
