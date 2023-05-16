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
  const address2 = "0xCB0477d1Af5b8b05795D89D59F4667b59eAE9244";

  // Get owners
  const owners1 = await alchemy.nft.getOwnersForContract(address);
  const owners2 = await alchemy.nft.getOwnersForContract(address2);

  await writeListToFile(owners1, "honey_jar.json");
  await writeListToFile(owners2, "honey_comb.json");
};

async function writeListToFile(list, fileName) {
  try {
    const convertedJson = list.owners.map((address) => ({ address }));
    const jsonString = JSON.stringify(convertedJson, null, 2);
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
