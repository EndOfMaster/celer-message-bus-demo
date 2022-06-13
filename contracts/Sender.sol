//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "./interface/IBatchTransfer.sol";
import "./interface/IMessageBus.sol";
import {MessageSenderLib, MsgDataTypes} from "./lib/MessageSenderLib.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Sender is IBatchTransfer {
    using SafeERC20 for IERC20;

    address public immutable messageBus;

    modifier onlyMessageBus() {
        require(msg.sender == messageBus, "caller is not message bus");
        _;
    }

    constructor(address _messageBus) {
        messageBus = _messageBus;
    }

    function send(
        address _receiver,
        address _token,
        uint256 _amount,
        uint64 _dstChainId,
        uint32 _maxSlippage,
        uint256 _dataAmount
    ) external payable {
        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);

        (uint256 _fee, bytes memory _data) = getFee(_dataAmount);
        require(msg.value > _fee, "Insufficient fee");

        MessageSenderLib.sendMessageWithTransfer(
            _receiver,
            _token,
            _amount,
            _dstChainId,
            uint64(block.timestamp), // nonce
            _maxSlippage,
            _data, // message
            MsgDataTypes.BridgeSendType.Liquidity, // the bridge type, we are using liquidity bridge at here
            messageBus,
            _fee
        );
    }

    function getFee(uint256 _dataAmount)
        public
        view
        returns (uint256, bytes memory)
    {
        bytes memory _data = abi.encode(_dataAmount);
        return (IMessageBus(messageBus).calcFee(_data), _data);
    }

    // ============== message bus support ==============

    function executeMessageWithTransferRefund(
        address _token,
        uint256 _amount,
        bytes calldata _message
    ) external payable onlyMessageBus returns (ExecutionStatus) {
        TransferRequest memory transfer = abi.decode(
            (_message),
            (TransferRequest)
        );
        IERC20(_token).safeTransfer(transfer.sender, _amount);
        return ExecutionStatus.Success;
    }

    function executeMessageWithTransferFallback(
        address _sender,
        address _token,
        uint256 _amount,
        uint64 _srcChainId,
        bytes memory _message
    ) external payable onlyMessageBus returns (ExecutionStatus) {
        TransferRequest memory transfer = abi.decode(
            (_message),
            (TransferRequest)
        );
        IERC20(_token).safeTransfer(transfer.sender, _amount);
        bytes memory message = abi.encode(
            TransferReceipt({
                nonce: transfer.nonce,
                status: TransferStatus.Fail
            })
        );

        MessageSenderLib.sendMessage(
            _sender,
            _srcChainId,
            message,
            messageBus,
            msg.value
        );
        return ExecutionStatus.Success;
    }

    fallback() external payable {}

    receive() external payable {}
}
