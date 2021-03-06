require( "@nomiclabs/hardhat-waffle" );
require( "@nomiclabs/hardhat-etherscan" );
require( 'dotenv' ).config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const RINKEBY_URL = process.env.RINKEBY_URL;
module.exports = {
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ ALCHEMY_API_KEY }`,
      accounts: [ RINKEBY_URL ],
      timeout: 60000
    },
  },
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: "CJJTBF2QU4T4S8GIHRND9TF8TJQ7TAEKFQ"
  },
  mocha: {
    timeout: 40000
  },
  paths: {
    artifacts: './frontend/src/artifacts',
  },
};