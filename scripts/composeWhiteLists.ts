import * as fs from "fs";
import * as path from "path";

interface AddressObject {
  address: string;
}

const jsonFiles: { [key: string]: string } = {
  alphaOrangeCrew: "../lists/alphaOrangeCrew/list.json",
  degenBeacon: "../lists/degenBeacon/list.json",
  honeyComb: "../lists/honeyComb/list.json",
  internal: "../lists/internal/list.json",
  xGrail: "../lists/xGrail/list.json",
  xGrailAllocator: "../lists/xGrailAllocator/list.json",
};

function mergeJsonFiles(fileKeys: string[]): AddressObject[] {
  let resultSet = new Set<string>();
  for (let key of fileKeys) {
    let data = fs.readFileSync(path.resolve(__dirname, jsonFiles[key]), "utf8");
    let addresses = Object.values(JSON.parse(data)) as AddressObject[];
    addresses.forEach((addressObject) => {
      // Convert the address to lowercase to avoid case sensitive duplicates
      resultSet.add(addressObject.address.toLowerCase());
    });
  }
  // Convert the set back to the AddressObject[] format
  return Array.from(resultSet).map((address) => ({ address }));
}

function formatJson(data: AddressObject[]): string {
  const formattedItems = data.map((item) => `  ${JSON.stringify(item)}`);
  return `[\n${formattedItems.join(",\n")}\n]`;
}

function createFileForPurpose(purpose: string, fileKeys: string[]) {
  const data = mergeJsonFiles(fileKeys);
  fs.writeFileSync(path.resolve(__dirname, `../WL/${purpose}.json`), formatJson(data));
}

createFileForPurpose("alphacrew", ["internal", "alphaOrangeCrew"]);
createFileForPurpose("camelot", [
  "internal",
  "alphaOrangeCrew",
  "xGrail",
  "xGrailAllocator",
  "degenBeacon",
  "honeyComb",
]);
