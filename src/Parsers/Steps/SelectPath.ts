import { PromptsInterface } from "../PromptsInterface";

export class SelectPath {
  private prompts: PromptsInterface;

  constructor(prompts: PromptsInterface) {
    this.prompts = prompts;
  }

  public async input(): Promise<string> {
    return await this.prompts.input(
      "Enter a local absolute path or a Web URL to parse."
    );
  }
}
