// const { expect } = require( "chai" );

// describe( "Deposit the amount", function () {
//     let dep;
//     let depDeployed;
//     let owner, ad1;

//     beforeEach( async function () {
//         dep = await ethers.getContractFactory( "Deposit" );
//         depDeployed = await Loan.deploy();
//         [ owner, ad1 ] = await ethers.getSigners();
//         coll = LoanDeployed.DB[ owner ].collateral;
//     } )

//     describe( "Check if loan given successfully", function () {
//         it( "Now sending loan to the girl", async function () {
//             await depDeployed.entryToDatabase( 10 );
//             expect( LoanDeployed.DB[ owner ].collateral ).to.equal( coll + 10 );
//         } )
//     } )

//     describe( "to see if collateral is sent back", function () {
//         it( "sending collateral back to the borrower", async function () {
//             await depDeployed.Depo( 10 );
//             expect( LoanDeployed.DB[ owner ].collateral ).to.equal( coll );
//         } )
//     } )
// } );
