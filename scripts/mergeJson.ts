//merge addresses, skip the duplicated addresses.
import * as fs from "fs";
import * as path from "path";

type AddressObject = {
  address: string;
};

function mergeUniqueAddresses(json1: AddressObject[], json2: AddressObject[]): AddressObject[] {
  const mergedSet = new Set<string>();

  for (const obj of json1) {
    mergedSet.add(obj.address);
  }

  for (const obj of json2) {
    mergedSet.add(obj.address);
  }

  return Array.from(mergedSet).map((address) => ({ address }));
}

const jsonFilePath1 = path.resolve(__dirname, "./list1.json");
const jsonFilePath2 = path.resolve(__dirname, "./list2.json");

const jsonContent1 = fs.readFileSync(jsonFilePath1, "utf-8");
const jsonContent2 = fs.readFileSync(jsonFilePath2, "utf-8");

const parsedJson1: AddressObject[] = JSON.parse(jsonContent1);
const parsedJson2: AddressObject[] = JSON.parse(jsonContent2);

const mergedJson = mergeUniqueAddresses(parsedJson1, parsedJson2);

//export
const outputPath = path.resolve(__dirname, "./list.json");
fs.writeFileSync(outputPath, JSON.stringify(mergedJson, null, 2));

console.log("Merged list written to list.json");
