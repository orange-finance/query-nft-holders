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
  strategist: "../lists/strategist/list.json",
  xGrail: "../lists/xGrail/list.json",
};

function mergeJsonFiles(fileKeys: string[]): AddressObject[] {
  let result: AddressObject[] = [];
  for (let key of fileKeys) {
    let data = fs.readFileSync(path.resolve(__dirname, jsonFiles[key]), "utf8");
    result = [...result, ...(Object.values(JSON.parse(data)) as AddressObject[])];
  }
  return result;
}

function formatJson(data: AddressObject[]): string {
  const formattedItems = data.map((item) => `  ${JSON.stringify(item)}`);
  return `[\n${formattedItems.join(",\n")}\n]`;
}

function createFileForPurpose(purpose: string, fileKeys: string[]) {
  const data = mergeJsonFiles(fileKeys);
  fs.writeFileSync(path.resolve(__dirname, `../WL/${purpose}.json`), formatJson(data));
}

createFileForPurpose("product", ["internal", "alphaOrangeCrew", "degenBeacon", "honeyComb"]);
createFileForPurpose("camelot", ["internal", "alphaOrangeCrew", "xGrail"]);
createFileForPurpose("floatLocker", ["internal", "alphaOrangeCrew", "strategist"]);
