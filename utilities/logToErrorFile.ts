import fs from "fs";
import path from "path";

const logFilePath = path.join(__dirname, "../error.log");

export function logErrorToFile(errorMessage: string): void {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${errorMessage}\n`;

  console.log(logEntry);

  fs.appendFileSync(logFilePath, logEntry);
}
