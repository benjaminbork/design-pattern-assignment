import { parsersConfig } from "../../../parsers.config";
import { PromptsInterface } from "../PromptsInterface";

export class SelectFormat {
  private prompts: PromptsInterface;

  constructor(prompts: PromptsInterface) {
    this.prompts = prompts;
  }

  public async select(selectedParser: string): Promise<string> {
    const parser = parsersConfig.find(
      (parser) => parser.parserKey === selectedParser
    );

    if (!parser) {
      throw new Error("Parser not found");
    }

    return await this.prompts.select(
      parser.formats?.map((format) => ({
        label: format,
        value: format,
      })),

      "Please select a target format."
    );
  }
}
