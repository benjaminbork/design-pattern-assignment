import { ParserStates } from "./ParserStates";
import { ParserIntroduction } from "./Steps/ParserIntroduction";
import { SelectParser } from "./Steps/SelectParser";
import { SelectFormat } from "./Steps/SelectFormat";
import { ParserInterface } from "./ParserInterface";
import { ReaderInterface } from "./ReaderInterface";
import { ParserProccessor } from "./Steps/ParserProcessor";
import { InputDataProcessor } from "./Steps/InputDataProcessor";
import { SelectPath } from "./Steps/SelectPath";
import { DatabaseInterface } from "./DatabaseInterface";
import { SaveProcessor } from "./Steps/SaveProcessor";

export class ParserStateManager {
  private db: DatabaseInterface;
  private parsers: ParserInterface[];
  private readers: ReaderInterface[];
  private introduction: ParserIntroduction;
  private parserProcessor: ParserProccessor;
  private saveProcessor: SaveProcessor;
  private inputDataProcessor: InputDataProcessor;
  private selectParser: SelectParser;
  private selectFormat: SelectFormat;
  private selectPath: SelectPath;

  private selectedPath: string | undefined;
  private selectedParser: string | undefined;
  private selectedFormat: string | undefined;

  private inputData: string | undefined;
  private result: string | undefined;

  constructor(
    db: DatabaseInterface,
    parsers: ParserInterface[],
    readers: ReaderInterface[],
    introduction: ParserIntroduction,
    selectParser: SelectParser,
    selectFormat: SelectFormat,
    selectPath: SelectPath,
    parserProcessor: ParserProccessor,
    saveProcessor: SaveProcessor,
    inputDataProcessor: InputDataProcessor
  ) {
    this.db = db;
    this.parsers = parsers;
    this.readers = readers;
    this.introduction = introduction;
    this.selectParser = selectParser;
    this.selectFormat = selectFormat;
    this.selectPath = selectPath;
    this.parserProcessor = parserProcessor;
    this.saveProcessor = saveProcessor;
    this.inputDataProcessor = inputDataProcessor;
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
        this.selectedParser = await this.selectParser.select();
        this.next({
          currentState: ParserStates.STATE_PARSER_SELECTED,
        });
        break;

      case ParserStates.STATE_PARSER_SELECTED:
        this.selectedFormat = await this.selectFormat.select(
          this.selectedParser || ""
        );
        this.next({
          currentState: ParserStates.STATE_FORMAT_SELECTED,
        });
        break;

      case ParserStates.STATE_FORMAT_SELECTED:
        this.selectedPath = await this.selectPath.input();
        this.next({
          currentState: ParserStates.STATE_PATH_SELECTED,
        });
        break;

      case ParserStates.STATE_PATH_SELECTED:
        this.inputData = await this.inputDataProcessor.process({
          readers: this.readers,
          path: this.selectedPath || "",
        });
        this.next({
          currentState: ParserStates.STATE_DATA_READ,
        });
        break;

      case ParserStates.STATE_DATA_READ:
        this.result = this.parserProcessor.process(
          this.selectedParser || "",
          this.selectedFormat || "",
          this.parsers,
          this.inputData || ""
        );
        this.next({ currentState: ParserStates.STATE_PARSER_PARSED });

        break;

      case ParserStates.STATE_PARSER_PARSED:
        await this.saveProcessor.save({
          data: this.result || "",
          format: this.selectedFormat || "",
          database: this.db,
        });
        this.next({ currentState: ParserStates.STATE_PARSER_SAVED });
        break;

      case ParserStates.STATE_PARSER_SAVED:
        console.log("Data saved");
        break;
      default:
        throw new Error("Invalid state");
    }
  }
}
