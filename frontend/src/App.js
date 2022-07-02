import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import abi from './artifacts/contracts/Deposit.sol/Deposit.json';
const contractABI = abi.abi;
const contractAddress = "0xC3039c0cFA9BBFe5Bf63E48a454Da170F7eA7744";

// hardhat local host contract address : 0x5FbDB2315678afecb367f032d93F642f64180aa3
// rinkeby tetsnet address : 0xC3039c0cFA9BBFe5Bf63E48a454Da170F7eA7744

function App () {
  const { ethereum } = window;
  const storeAdrress = async () => {
    await ethereum.request( { method: 'eth_requestAccounts' } );
    const [ account ] = await ethereum.request( { method: 'eth_accounts' } );
    // console.log( account );
    return account;
  }

  const [ coll, setColl ] = useState( 0 );
  const [ withColl, setwithColl ] = useState( 0 );

  const changeColl = async ( event ) => {
    if ( typeof ethereum !== 'undefined' ) {
      console.log( 'MetaMask is installed!' );
      const provider = new ethers.providers.Web3Provider( ethereum );
      const signer = provider.getSigner()
      const Deposit = new ethers.Contract( contractAddress, contractABI, signer );

      event.preventDefault();
      const tx = await Deposit.entryToDatabase( coll * Math.pow( 10, 8 ), { value: ethers.utils.parseEther( coll ) } );
      await tx.wait();
      console.log( coll );
      const account = await storeAdrress();

      const { _hex } = ( await Deposit.DB( account ) ).collateral;
      const finalcoll = parseInt( _hex ) / Math.pow( 10, 18 );
      console.log( finalcoll, _hex );

      const debt = ( await Deposit.DB( account ) ).amount;
      const debt1 = parseInt( debt._hex ) / Math.pow( 10, 18 );
      console.log( debt1, debt._hex );
    }
    else {
      console.log( "Metamask not found" );
    }
  }


  const WithdrawCollateral = async ( event ) => {
    if ( typeof ethereum !== 'undefined' ) {
      console.log( withColl );
      console.log( 'MetaMask is installed!' );
      const provider = new ethers.providers.Web3Provider( ethereum );
      const signer = provider.getSigner()
      const Deposit = new ethers.Contract( contractAddress, contractABI, signer );

      event.preventDefault();
      const tx = await Deposit.Depo( withColl );
      await tx.wait();
      const account = await storeAdrress();

      const { _hex } = ( await Deposit.DB( account ) ).collateral;
      const finalcoll = parseInt( _hex ) / Math.pow( 10, 18 );
      console.log( finalcoll, _hex );

      const debt = ( await Deposit.DB( account ) ).amount;
      const debt1 = parseInt( debt._hex ) / Math.pow( 10, 18 );
      console.log( debt1, debt._hex );
    }
    else {
      console.log( "Metamask not found" );
    }
  }

  return (
    <div class="Screen" >
      <div class="title">LOAN DAPP</div>
      <form className='LOAN'>
        <input className='input'
          placeholder='Deposit collateral'
          type="number"
          value={ coll }
          onChange={ ( e ) => setColl( e.target.value ) }
        />
        <br />
        <button onClick={ changeColl } className='button'> SUBMIT </button>
      </form>

      <form className='DEPOSITS MONEY'>
        <input className='input'
          placeholder='Withdraw collateral'
          type="number"
          value={ withColl }
          onChange={ ( e ) => setwithColl( e.target.value ) }
        />
        <br />
        <button onClick={ WithdrawCollateral } className='button'> SUBMIT </button>
      </form>
    </div>
  );
}

export default App;