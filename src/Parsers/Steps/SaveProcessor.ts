import { DatabaseInterface } from "../DatabaseInterface";
import { ParsedDTO } from "../ParsedDTO";

export class SaveProcessor {
  public async save({
    data,
    format,
    database,
  }: {
    data: string;
    format: string;
    database: DatabaseInterface;
  }): Promise<void> {
    const parsedDTO = new ParsedDTO({ data, format });
    await database.save({ parsedDTO });
  }
}
