const { expect } = require( "chai" );

describe( "Lend", function () {
    let Loan;
    let LoanDeployed;
    let owner, ad1;
    let coll;

    beforeEach( async function () {
        Loan = await ethers.getContractFactory( "Lend" );
        LoanDeployed = await Loan.deploy();
        [ owner, ad1 ] = await ethers.getSigners();
        coll = LoanDeployed.DB( owner ).collateral;
    } )

    describe( "Check if loan given successfully", function () {
        it( "Now sending loan to the girl", async function () {
            await LoanDeployed.entryToDatabase( 10 );
            expect( LoanDeployed.DB( owner ).collateral ).to.equal( coll + 10 );
        } )
    } )
} );











