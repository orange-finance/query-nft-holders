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
  const address = "0xCB0477d1Af5b8b05795D89D59F4667b59eAE9244";

  // Get owners
  const owners = await alchemy.nft.getOwnersForContract(address);

  await writeListToFile(owners, "honey-comb/holders.json");
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
