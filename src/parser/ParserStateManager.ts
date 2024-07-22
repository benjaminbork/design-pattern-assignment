import { ParserStates } from "./ParserStates";
import { ParserIntroduction } from "./Steps/ParserIntroduction";
import { SelectParser } from "./Steps/SelectParser";
import { SelectFormat } from "./Steps/SelectFormat";

export class ParserStateManager {
  private introduction: ParserIntroduction;
  private selectParser: SelectParser;
  private selectFormat: SelectFormat;
  private selectedParser: string | undefined;
  private selectedFormat: string | undefined;

  constructor(
    introduction: ParserIntroduction,
    selectParser: SelectParser,
    selectFormat: SelectFormat
  ) {
    this.introduction = introduction;
    this.selectParser = selectParser;
    this.selectFormat = selectFormat;
  }

  public async next({
    currentState,
    payload,
  }: {
    currentState: ParserStates;
    payload?: string;
  }): Promise<void> {
    switch (currentState) {
      case ParserStates.STATE_APP_STARTED:
        this.introduction.intro();
        this.next({ currentState: ParserStates.STATE_PARSER_INITIALIZED });
        break;

      case ParserStates.STATE_PARSER_INITIALIZED:
        const selectedParser = await this.selectParser.select();

        if (!selectedParser) {
          throw new Error("No parser selected");
        }
        this.selectedParser = selectedParser;

        this.next({
          currentState: ParserStates.STATE_PARSER_SELECTED,
        });
        break;

      case ParserStates.STATE_PARSER_SELECTED:
        this.selectFormat.setParser(this.selectedParser || "");
        const selectedFormat = await this.selectFormat.select();

        if (!selectedFormat) {
          throw new Error("No format selected");
        }
        this.selectedFormat = selectedFormat;

        this.next({
          currentState: ParserStates.STATE_FORMAT_SELECTED,
        });
    }
  }
}
