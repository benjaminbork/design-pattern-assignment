import { ParserStates } from "./ParserStates";
import { ParserIntroduction } from "./Steps/ParserIntroduction";
import { SelectParser } from "./Steps/SelectParser";
import { SelectFormat } from "./Steps/SelectFormat";
import { ParserInterface } from "./ParserInterface";

export class ParserStateManager {
  private parsers: ParserInterface[];
  private introduction: ParserIntroduction;
  private selectParser: SelectParser;
  private selectFormat: SelectFormat;
  private selectedParser: string | undefined;
  private selectedFormat: string | undefined;

  constructor(
    parsers: ParserInterface[],
    introduction: ParserIntroduction,
    selectParser: SelectParser,
    selectFormat: SelectFormat
  ) {
    this.parsers = parsers;
    this.introduction = introduction;
    this.selectParser = selectParser;
    this.selectFormat = selectFormat;
  }

  public async next({
    currentState,
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
        this.selectedParser = selectedParser;
        this.next({
          currentState: ParserStates.STATE_PARSER_SELECTED,
        });
        break;

      case ParserStates.STATE_PARSER_SELECTED:
        this.selectFormat.setParser(this.selectedParser || "");
        const selectedFormat = await this.selectFormat.select();
        this.selectedFormat = selectedFormat;
        this.next({
          currentState: ParserStates.STATE_FORMAT_SELECTED,
        });
        break;

      case ParserStates.STATE_FORMAT_SELECTED:
        // create Factory
        break;

      case ParserStates.STATE_PARSER_INITIALIZED:
        // Parse data
        break;

      case ParserStates.STATE_PARSER_PARSED:
        // Output data
        break;

      case ParserStates.STATE_PARSER_OUTPUTED:
        // Save data
        break;

      case ParserStates.STATE_PARSER_SAVED:
        // Exit - good bye
        break;

      default:
        throw new Error("Invalid state");
    }
  }
}
