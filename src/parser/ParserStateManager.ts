import { ParserStates } from "./ParserStates";
import { PromptsInterface } from "./PromptsInterface";
import { ParserIntroduction } from "./Steps/ParserIntroduction";

export class ParserStateManager {
  private introduction: ParserIntroduction;

  constructor(introduction: ParserIntroduction) {
    this.introduction = introduction;
  }

  public next({ currentState }: { currentState: ParserStates }): void {
    switch (currentState) {
      case ParserStates.STATE_PARSER_INITIALIZED:
        this.introduction.intro();
        break;
    }
  }
}
