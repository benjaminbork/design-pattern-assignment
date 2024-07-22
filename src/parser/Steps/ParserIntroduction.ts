import { PromptsInterface } from "../PromptsInterface";

export class ParserIntroduction {
  private prompts: PromptsInterface;

  constructor(prompts: PromptsInterface) {
    this.prompts = prompts;
  }

  public intro(): void {
    return this.prompts.intro();
  }
}
