import { PromptsInterface } from "../PromptsInterface";

export class ParserOutro {
  private prompts: PromptsInterface;

  constructor(prompts: PromptsInterface) {
    this.prompts = prompts;
  }

  public async outro(): Promise<void> {
    await this.prompts.outro(
      "The file was succesfully localy saved.\nThank you for using the parser. Goodbye!"
    );
  }
}
