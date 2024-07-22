import { PromptsInterface } from "../PromptsInterface";

export class ParserIntroduction {
  private prompts: PromptsInterface;

  constructor(prompts: PromptsInterface) {
    this.prompts = prompts;
  }

  public intro(): void {
    this.prompts.intro(
      "Welcome to the parser. Please select an option from the list below."
    );
  }
}
