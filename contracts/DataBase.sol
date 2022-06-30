// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

contract DataBase {
    struct Borrower{
        uint amount;
        uint collateral;
    }

    mapping(address => Borrower) public DB;
    event DepositEvent(Borrower a);
} 