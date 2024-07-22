import { PromptsInterface } from "./PromptsInterface";

export class PromptsAdapter implements PromptsInterface {
  private prompts: PromptsInterface;

  constructor(prompts: PromptsInterface) {
    this.prompts = prompts;
  }

  public intro(introductionText: string): void {
    return this.prompts.intro(introductionText);
  }

  public async select(
    options: Array<{ label: string; value: string }>,
    message: string
  ): Promise<string> {
    return await this.prompts.select(options, message);
  }
}
