import { parsersConfig } from "../../../parsers.config";
import { PromptsInterface } from "../PromptsInterface";

export class SelectFormat {
  private prompts: PromptsInterface;
  private selectedParser: string = "";

  constructor(prompts: PromptsInterface) {
    this.prompts = prompts;
  }

  public async select(): Promise<string> {
    const selectedParser = parsersConfig.find(
      (parser) => parser.parserKey === this.selectedParser
    );

    if (!selectedParser) {
      throw new Error("Parser not found");
    }

    return await this.prompts.select(
      selectedParser.formats?.map((format) => ({
        label: format,
        value: format,
      })),

      "Please select a target format."
    );
  }

  public setParser(parser: string): void {
    this.selectedParser = parser;
  }
}
