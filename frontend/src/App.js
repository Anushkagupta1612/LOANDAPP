import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import abi from './artifacts/contracts/Deposit.sol/Deposit.json';
// import account from 'etherscan-api/lib/account';
const contractABI = abi.abi;
const contractAddress = "0xd2b45Eaf66476335784aaE64408767e6e53caF63";

// hardhat local host contract address : 0x5FbDB2315678afecb367f032d93F642f64180aa3
// rinkeby tetsnet address : 0xd2b45Eaf66476335784aaE64408767e6e53caF63

function App () {
  //MetaMask detection
  // const requestWallet = () => {
  //   ethereum.request( { method: 'eth_requestAccounts' } );
  // }

  // Store address
  const { ethereum } = window;
  const storeAdrress = async () => {
    await ethereum.request( { method: 'eth_requestAccounts' } );
    const [ account ] = await ethereum.request( { method: 'eth_accounts' } );
    // console.log( account );
    return account;
  }

  const [ coll, setColl ] = useState( "" );
  const [ withColl, setwithColl ] = useState( "" );

  const changeColl = async ( event ) => {
    if ( typeof ethereum !== 'undefined' ) {
      console.log( 'MetaMask is installed!' );
      const provider = new ethers.providers.Web3Provider( ethereum );
      const signer = provider.getSigner()
      const Deposit = new ethers.Contract( contractAddress, contractABI, signer );

      event.preventDefault();
      await Deposit.entryToDatabase( coll );
      console.log( coll );
      const account = await storeAdrress();
      const { _hex } = ( await Deposit.DB( account ) ).collateral;
      console.log( _hex ); //0x00
      const tokens = parseInt( _hex ) / Math.pow( 10, 18 );
      console.log( tokens ); //0
      // console.log( ( await Deposit.DB( account ) ).collateral / ( 10 ** 18 ) );
      // const usdc = await Deposit.getLatestPrice();
      // console.log( usdc * Math.pow( 10, 10 ) * coll );
    }
    else {
      console.log( "Metamask not found" );
    }
  }


  const WithdrawCollateral = async ( event ) => {
    if ( typeof ethereum !== 'undefined' ) {
      console.log( 'MetaMask is installed!' );
      const provider = new ethers.providers.Web3Provider( ethereum );
      const signer = provider.getSigner()
      const Deposit = new ethers.Contract( contractAddress, contractABI, signer );

      event.preventDefault();
      await Deposit.Depo( coll );
      console.log( coll );
      const account = await storeAdrress();
      const { _hex } = ( await Deposit.DB( account ) ).collateral;
      const tokens = parseInt( _hex ) / Math.pow( 10, 18 );
      console.log( tokens );
    }
    else {
      console.log( "Metamask not found" );
    }
  }

  return (
    <div>
      <button onClick={ storeAdrress }> get wallet address </button>
      <form className='LOAN'>
        <input
          placeholder='Deposit collateral'
          type="number"
          value={ coll }
          onChange={ ( e ) => setColl( e.target.value ) }
        />
        <button onClick={ changeColl }> SUBMIT </button>
      </form>

      <form className='DEPOSITS MONEY'>
        <input
          placeholder='Withdraw collateral'
          type="number"
          value={ withColl }
          onChange={ ( e ) => setwithColl( e.target.value ) }
        />
        <button onClick={ WithdrawCollateral }> SUBMIT </button>
      </form>
    </div>
  );
}

export default App;