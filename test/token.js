const { expect } = require( "chai" );

describe( "Token", function () {
    it( "should assign name to LOAN", async function () {
        const Token = await ethers.getContractFactory( "Token" );
        const hardhatToken = await Token.deploy();
        const name = await hardhatToken.name();
        expect( name ).to.equal( "LOAN" );
    } )

    it( "To check for symbol to SIL", async function () {
        const Token = await ethers.getContractFactory( "Token" );
        const hardhatToken = await Token.deploy();
        const name = await hardhatToken.symbol();
        expect( name ).to.equal( "SIL" );
    } )
} );