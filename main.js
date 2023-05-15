const { Alchemy, Network } = require("alchemy-sdk");
const fs = require("fs/promises");
require("dotenv").config();

const config = {
  apiKey: process.env.API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

const main = async () => {
  // Contract address
  const address = "0xa20cf9b0874c3e46b344deaeea9c2e0c3e1db37d";

  // Get owners
  const owners = await alchemy.nft.getOwnersForContract(address);
  await writeListToFile(owners, "list.json");
};

async function writeListToFile(list, fileName) {
  try {
    const jsonString = JSON.stringify(list, null, 2);
    await fs.writeFile(fileName, jsonString);
    console.log(`list have been saved to ${fileName}`);
  } catch (error) {
    console.error("Failed to save list to a file:", error);
  }
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
