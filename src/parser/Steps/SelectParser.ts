import { parsersConfig } from "../../../parsers.config";
import { PromptsInterface } from "../PromptsInterface";

export class SelectParser {
  private prompts: PromptsInterface;

  constructor(prompts: PromptsInterface) {
    this.prompts = prompts;
  }

  public async select(): Promise<string> {
    return await this.prompts.select(
      parsersConfig.map((parser) => ({
        label: parser.parserLabel,
        value: parser.parserKey,
      })),

      "Please select a parser to use."
    );
  }
}
