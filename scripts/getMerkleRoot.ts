import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import { keccak256 } from "js-sha3";
import * as fs from "fs";
import * as path from "path";

async function hashed(target: any[]) {
  return target.map(({ address }) => {
    return ethers.solidityPackedKeccak256(["address"], [address]);
  });
}

async function main() {
  const jsonFilePath = path.resolve(__dirname, "../WL/alphacrew.json"); //update here to change list to import
  const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
  const list = JSON.parse(jsonData);

  const leaves = await hashed(list);
  const tree = await new MerkleTree(leaves, keccak256, { sort: true });
  const root = await tree.getHexRoot();

  console.log("root:", root);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
