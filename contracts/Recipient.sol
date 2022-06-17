//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

contract Recipient {
    enum ExecutionStatus {
        Fail,
        Success,
        Retry
    }

    address public immutable messageBus;

    address public sender;
    address public token;
    uint256 public amount;
    uint64 public srcChainId;
    address public executor;
    uint256 public messagerData;

    modifier onlyMessageBus() {
        require(msg.sender == messageBus, "caller is not message bus");
        _;
    }

    constructor(address _messageBus) {
        messageBus = _messageBus;
    }

    function executeMessageWithTransfer(
        address _sender,
        address _token,
        uint256 _amount,
        uint64 _srcChainId,
        bytes calldata _message,
        address _executor
    ) external onlyMessageBus returns (ExecutionStatus) {
        sender = _sender;
        token = _token;
        amount = _amount;
        srcChainId = _srcChainId;
        executor = _executor;
        messagerData = abi.decode(_message, (uint256));
        return ExecutionStatus.Success;
    }

    function getSendMessage()
        external
        view
        returns (
            address,
            address,
            uint256,
            uint64,
            address,
            uint256
        )
    {
        return (sender, token, amount, srcChainId, executor, messagerData);
    }
}
