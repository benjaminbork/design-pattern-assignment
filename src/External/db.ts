import { ParsedDTO } from "../Parsers/ParsedDTO";
import fs from "fs";
import path from "path";
import { DatabaseInterface } from "../Parsers/DatabaseInterface";

export class Database implements DatabaseInterface {
  public async save({ parsedDTO }: { parsedDTO: ParsedDTO }): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `../../data-${timestamp}.${parsedDTO.format}`;
    const filePath = path.join(__dirname, filename);

    fs.writeFile(filePath, parsedDTO.data, { encoding: "utf-8" }, (err) => {
      if (err) {
        console.error("Failed to write CSV file:", err);
        throw new Error("Failed to write CSV file");
      }
    });
  }
}
