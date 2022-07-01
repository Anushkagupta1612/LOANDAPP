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
        // console.log(DB[msg.sender].collateral);
        uint to_lend = uint(getLatestPrice())/(10**8);
        to_lend = to_lend * (_collateral);
        mint(msg.sender, uint(to_lend));
        DB[msg.sender].amount += to_lend;
        DB[msg.sender].collateral += _collateral;
        emit DepositEvent(DB[msg.sender]);
    }

} 