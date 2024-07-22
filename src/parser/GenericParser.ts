import { ParserInterface } from "./ParserInterface";

export class GenericParser {
  private parsers: ParserInterface[];

  constructor(parsers: ParserInterface[]) {
    this.parsers = parsers;
  }

  public parseToFormat({
    data,
    format,
  }: {
    data: string;
    format: string;
  }): void {
    this.parsers.forEach((parser) => {
      if (parser.canHandle({ format })) {
        parser.parse({ data });
      }
    });

    throw new Error("No parser found");
  }
}
