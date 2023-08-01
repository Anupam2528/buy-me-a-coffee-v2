const hre = require("hardhat");

async function main() {
  const buyMeACoffee = await hre.ethers.deployContract("BuyMeACoffee");
  await buyMeACoffee.waitForDeployment();

  console.log(`Deployed contract address : ${buyMeACoffee.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
