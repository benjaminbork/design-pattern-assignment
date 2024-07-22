import { Database } from "../External/db";
import { DatabaseInterface } from "./DatabaseInterface";
import { ParsedDTO } from "./ParsedDTO";

export class DatabaseAdapter implements DatabaseInterface {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  public async save({ parsedDTO }: { parsedDTO: ParsedDTO }): Promise<void> {
    await this.database.save({
      parsedDTO: parsedDTO,
    });
  }
}
