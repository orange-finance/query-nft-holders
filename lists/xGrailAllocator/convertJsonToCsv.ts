import * as fs from "fs";
import * as path from "path";

function jsonToCsv(json: any[]): string {
  if (json.length === 0) return "";

  const headers = Object.keys(json[0]);
  const csv = [
    headers.join(","),
    ...json.map((row) => headers.map((header) => JSON.stringify(row[header] || "")).join(",")),
  ];

  return csv.join("\n");
}

function convertFile(inputFilePath: string, outputFilePath: string): void {
  const absoluteInputPath = path.resolve(__dirname, inputFilePath);
  const jsonData = fs.readFileSync(absoluteInputPath, "utf-8");
  const jsonObj = JSON.parse(jsonData);
  const csvData = jsonToCsv(jsonObj);

  const absoluteOutputPath = path.resolve(__dirname, outputFilePath);
  fs.writeFileSync(absoluteOutputPath, csvData);
}

convertFile("./list.json", "./list.csv");
