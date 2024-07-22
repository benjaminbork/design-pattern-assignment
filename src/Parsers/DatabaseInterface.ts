import { ParsedDTO } from "./ParsedDTO";

export interface DatabaseInterface {
  save({ parsedDTO }: { parsedDTO: ParsedDTO }): Promise<void>;
}
