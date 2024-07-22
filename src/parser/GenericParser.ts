import { ParserInterface } from "./ParserInterface";

export class GenericParser {
  private parsers: ParserInterface[];

  constructor(parsers: ParserInterface[]) {
    this.parsers = parsers;
  }

  public parseToFormat(): void {
    this.parsers.forEach((parser) => {
      if (parser.canHandle()) {
        parser.parse();
      }
    });

    throw new Error("No parser found");
  }
}
