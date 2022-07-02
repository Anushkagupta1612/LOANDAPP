// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

import "./DataBase.sol";
import "./Token.sol";
import "./Lend.sol";

contract Deposit is DataBase,Token,Lend {

    function Depo( uint _amount) public payable
    {    
        require(int(_amount) <= int(balanceOf(msg.sender)));
        require(int(_amount) <= int(DB[msg.sender].amount));
        burn(msg.sender,_amount*(10**18));
        DB[msg.sender].amount -= _amount;
        uint SendHimBack = _amount / (uint(getLatestPrice())/(10**8));
        payable(msg.sender).transfer(SendHimBack);
        DB[msg.sender].collateral -= SendHimBack;
        emit DepositEvent(DB[msg.sender]);
    }
} 