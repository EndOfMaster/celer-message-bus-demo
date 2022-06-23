//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

interface IBaseStruct {
    // ------------ message bus use ------------

    struct TransferRequest {
        uint64 nonce;
        address[] accounts;
        uint256[] amounts;
        address sender;
    }

    enum ExecutionStatus {
        Fail,
        Success,
        Retry
    }

    // ------------ this demo use ------------

    struct TransferData {
        bool back; //If true returns the source chain
        uint32 maxSlippage;
        address to;
    }
}
