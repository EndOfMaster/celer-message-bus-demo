//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "./support/Base.sol";

contract Demo is Base {
    using SafeERC20 for IERC20;

    event Send(bytes32 transferId);

    constructor(address _messageBus) Base(_messageBus) {}

    function send(
        address _receiver,
        address _token,
        uint256 _amount,
        uint64 _dstChainId,
        uint32 _maxSlippage,
        address _swapFrom,
        bytes memory _swapData,
        address _swapTo
    ) external payable {
        IERC20(_token).safeTransferFrom(msg.sender, address(this), _amount);

        TransferData memory _transferData = TransferData({
            _type: 1,
            back: true,
            swapFromToken: _swapFrom,
            swapData: _swapData,
            swapToToken: _swapTo,
            maxSlippage: _maxSlippage,
            to: msg.sender
        });

        (uint256 _fee, bytes memory _sendData) = getFee(_transferData);

        require(msg.value >= _fee, "Insufficient fee");

        bytes32 transferId = MessageSenderLib.sendMessageWithTransfer(
            _receiver,
            _token,
            _amount,
            _dstChainId,
            uint64(block.timestamp),
            _maxSlippage,
            _sendData, // message
            MsgDataTypes.BridgeSendType.Liquidity, // the bridge type, we are using liquidity bridge at here
            messageBus,
            _fee
        );
        emit Send(transferId);
    }

    function getFee(TransferData memory _data) public view returns (uint256 _fee, bytes memory _sendData) {
        _sendData = abi.encode(_data);
        _fee = IMessageBus(messageBus).calcFee(_sendData);
    }
}
