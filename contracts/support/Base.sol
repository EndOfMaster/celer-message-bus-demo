//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "../interface/IBaseStruct.sol";
import "../interface/IMessageBus.sol";
import { MessageSenderLib, MsgDataTypes } from "../lib/MessageSenderLib.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

abstract contract Base is IBaseStruct {
    using SafeERC20 for IERC20;

    event CrossChain(bytes32 transferId, address sender, address token, uint256 amount, uint64 toChain);
    event Transfer2Address(address sender, address token, uint256 amount);

    address public immutable messageBus;

    constructor(address _messageBus) {
        messageBus = _messageBus;
    }

    modifier onlyMessageBus() {
        require(msg.sender == messageBus, "caller is not message bus");
        _;
    }

    function executeMessageWithTransfer(
        address _sender, //Send cross chain contracts
        address _token,
        uint256 _amount,
        uint64 _srcChainId, //Source chain number
        bytes calldata _message, //send data
        address //_executor Address to trigger execute
    ) external onlyMessageBus returns (ExecutionStatus) {
        // TransferData memory _data = abi.decode(_message, (TransferData));
        // if (_data.back) {
        //     bytes memory _sendData = abi.encode(TransferData({ back: false, maxSlippage: _data.maxSlippage, to: _data.to }));
        //     uint256 _fee = IMessageBus(messageBus).calcFee(_sendData);

        //     bytes32 transferId = MessageSenderLib.sendMessageWithTransfer(
        //         _sender,
        //         _token, //test use original token
        //         _amount, //test use original amount
        //         _srcChainId,
        //         uint64(block.timestamp),
        //         _data.maxSlippage,
        //         _sendData, // message
        //         MsgDataTypes.BridgeSendType.Liquidity, // the bridge type, we are using liquidity bridge at here
        //         messageBus,
        //         _fee
        //     );
        //     emit CrossChain(transferId, _data.to, _token, _amount, _srcChainId);
        // } else {
        //     IERC20(_token).transfer(_data.to, _amount);
        //     emit Transfer2Address(_data.to, _token, _amount);
        // }
        require(false, "aaa");
        return ExecutionStatus.Success;
    }

    TransferData public transfer;

    //Bridge error call this
    function executeMessageWithTransferRefund(
        address _sender,
        uint64 _srcChainId,
        bytes memory _message,
        address // executor
    ) external payable onlyMessageBus returns (ExecutionStatus) {
        TransferData memory _transfer = abi.decode(_message, (TransferData));
        // IERC20(_token).safeTransfer(_transfer.sender, _amount);
        transfer = _transfer;
        return ExecutionStatus.Success;
    }

    TransferData public transfer2;

    //Target Chain Transaction error call this
    function executeMessageWithTransferFallback(
        address _sender,
        address _token,
        uint256 _amount,
        uint64 _srcChainId,
        bytes memory _message,
        address // executor
    ) external payable onlyMessageBus returns (ExecutionStatus) {
        TransferData memory _transfer = abi.decode((_message), (TransferData));
        // IERC20(_token).safeTransfer(_transfer.sender, _amount);
        transfer = _transfer;
        return ExecutionStatus.Success;
    }

    fallback() external payable {}

    receive() external payable {}
}
