const hre = require("hardhat");

async function main() {
  console.log("Deploying PhotoFinder2 contract...");

  const PhotoFinder = await hre.ethers.getContractFactory("PhotoFinder2");
  const photoFinder = await PhotoFinder.deploy();

  await photoFinder.waitForDeployment();

  const address = await photoFinder.getAddress();
  console.log("PhotoFinder deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 