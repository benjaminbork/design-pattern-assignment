import { PromptsInterface } from "./PromptsInterface";

export class PromptsAdapter implements PromptsInterface {
  private prompts: PromptsInterface;

  constructor(prompts: PromptsInterface) {
    this.prompts = prompts;
  }

  public intro(): void {
    return this.prompts.intro();
  }
}
