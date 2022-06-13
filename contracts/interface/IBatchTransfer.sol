//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

interface IBatchTransfer {
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

    enum TransferStatus {
        Null,
        Success,
        Fail
    }

    struct TransferReceipt {
        uint64 nonce;
        TransferStatus status;
    }
}
