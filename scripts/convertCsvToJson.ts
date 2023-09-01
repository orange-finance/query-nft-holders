import * as fs from "fs";
import * as path from "path";

const csvFiles: { [key: string]: string } = {
  alphaOrangeCrew: "../lists/alphaOrangeCrew/list.csv",
  degenBeacon: "../lists/degenBeacon/list.csv",
  honeyComb: "../lists/honeyComb/list.csv",
  internal: "../lists/internal/list.csv",
  xGrail: "../lists/xGrail/list.csv",
  xGrailAllocator: "../lists/xGrailAllocator/list.csv",
};

const guildFiles: { [key: string]: string } = {
  alphaOrangeCrew: "../lists/alphaOrangeCrew/list.json",
  degenBeacon: "../lists/degenBeacon/list.json",
  honeyComb: "../lists/honeyComb/list.json",
  internal: "../lists/internal/list.json",
  xGrail: "../lists/xGrail/list.json",
  xGrailAllocator: "../lists/xGrailAllocator/list.json",
};

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

function convertFile(purpose: string): void {
  const absoluteInputPath = path.resolve(__dirname, csvFiles[purpose]);

  const csv = fs.readFileSync(absoluteInputPath, "utf-8");
  const jsonData = csvToJSON(csv);

  const absoluteOutputPath = path.resolve(__dirname, guildFiles[purpose]);
  fs.writeFileSync(absoluteOutputPath, JSON.stringify(jsonData, null, 2));
}

convertFile("xGrail");
convertFile("xGrailAllocator");
