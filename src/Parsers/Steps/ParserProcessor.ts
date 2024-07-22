import { AbstractParserFactory } from "../AbstractParserFactory";

export class ParserProcessor {
  private parserFactory: AbstractParserFactory;

  constructor(parserFactory: AbstractParserFactory) {
    this.parserFactory = parserFactory;
  }

  public process({ data, format }: { data: string; format: string }) {
    try {
      const parser = this.parserFactory.createParser();

      const parsedObject = parser.parse({ data });
    } catch (error) {}
  }
}
