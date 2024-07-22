import { XMLLocalParser } from "./XMLLocalParser";

class XMLLocalParserFactory {
  static createParser(): XMLLocalParser {
    return new XMLLocalParser();
  }
}

export { XMLLocalParserFactory };
