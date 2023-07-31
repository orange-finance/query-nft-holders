import * as fs from "fs";
import * as path from "path";

type CSVToJSON = (csv: string) => Array<{ address: string }>;

const csvToJSON: CSVToJSON = (csv) => {
  const lines = csv.split("\n");
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].trim();

    if (currentLine === "") continue;

    const splittedLine = currentLine.split(",");
    const jsonObj = {
      address: splittedLine[0],
    };

    result.push(jsonObj);
  }

  return result;
};

const csvFilePath = path.resolve(__dirname, "./list.csv");
const csv = fs.readFileSync(csvFilePath, "utf-8");

const jsonData = csvToJSON(csv);
fs.writeFileSync(path.resolve(__dirname, `./list.json`), JSON.stringify(jsonData, null, 2)); // 2 spaces for indentation
