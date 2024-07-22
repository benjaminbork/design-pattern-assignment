import { ParserInterface } from "./ParserInterface";

export abstract class AbstractParserFactory {
  public abstract createParser(): ParserInterface;
}
