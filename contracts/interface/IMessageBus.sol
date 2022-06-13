//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

interface IMessageBus {
    function sendMessageWithTransfer(
        address _receiver,
        uint256 _dstChainId,
        address _srcBridge,
        bytes32 _srcTransferId,
        bytes calldata _message
    ) external payable;

    function sendMessage(
        address _receiver,
        uint256 _dstChainId,
        bytes calldata _message
    ) external payable;

    function calcFee(bytes calldata _message) external view returns (uint256);
}
