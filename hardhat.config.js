require( "@nomiclabs/hardhat-waffle" );
require( 'dotenv' ).config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const RINKEBY_URL = process.env.RINKEBY_PRIVATE_KEY;
module.exports = {
  solidity: "0.8.15",

  networks: {
    rinkeby: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ ALCHEMY_API_KEY }`,
      accounts: [ `${ RINKEBY_URL }` ],
    },
  },
};