// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.15;

import "./DataBase.sol";
import "./Token.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
// import "hardhat/console.sol";

contract Lend is DataBase,Token {

    // getting the coreect amount to be lent
    AggregatorV3Interface internal priceFeed;
    constructor() payable {
        priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    }
    
    function getLatestPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return (price);
    }

    function entryToDatabase( uint _collateral ) public payable
    {
        uint to_lend = (_collateral) * uint(getLatestPrice())/(10**8) * (10**10);
        mint(msg.sender, uint(to_lend));
        DB[msg.sender].amount += msg.value*(uint(getLatestPrice())/(10**8));
        DB[msg.sender].collateral += msg.value;
        emit DepositEvent(DB[msg.sender]);
    }

} 