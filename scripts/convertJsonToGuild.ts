import * as fs from "fs";
import * as path from "path";

const jsonFiles: { [key: string]: string } = {
  alphaOrangeCrew: "../lists/alphaOrangeCrew/list.json",
  degenBeacon: "../lists/degenBeacon/list.json",
  honeyComb: "../lists/honeyComb/list.json",
  internal: "../lists/internal/list.json",
  strategist: "../lists/strategist/list.json",
  xGrail: "../lists/xGrail/list.json",
  xGrailAllocator: "../lists/xGrailAllocator/list.json",
};

const guildFiles: { [key: string]: string } = {
  alphaOrangeCrew: "../lists/alphaOrangeCrew/guild.csv",
  degenBeacon: "../lists/degenBeacon/guild.csv",
  honeyComb: "../lists/honeyComb/guild.csv",
  internal: "../lists/internal/guild.csv",
  strategist: "../lists/strategist/guild.csv",
  xGrail: "../lists/xGrail/guild.csv",
  xGrailAllocator: "../lists/xGrailAllocator/guild.csv",
};

function jsonToCsv(json: any[]): string {
  if (json.length === 0) return "";

  function sliceFirstAndLast(str: string): string {
    return str.slice(1, -1);
  }

  const headers = Object.keys(json[0]);
  const csv = json.map((row) =>
    headers.map((header) => sliceFirstAndLast(JSON.stringify(row[header] || ""))).join(",")
  );

  return csv.join("\n");
}

function convertFile(purpose: string): void {
  const absoluteInputPath = path.resolve(__dirname, jsonFiles[purpose]);
  const jsonData = fs.readFileSync(absoluteInputPath, "utf-8");
  const jsonObj = JSON.parse(jsonData);
  const csvData = jsonToCsv(jsonObj);

  const absoluteOutputPath = path.resolve(__dirname, guildFiles[purpose]);
  fs.writeFileSync(absoluteOutputPath, csvData);
}

convertFile("alphaOrangeCrew");
convertFile("degenBeacon");
convertFile("honeyComb");
convertFile("internal");
convertFile("strategist");
convertFile("xGrail");
convertFile("xGrailAllocator");
