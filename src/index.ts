#!/usr/bin/env ts-node

import { PromptsAdapter } from "./Parsers/PomptsAdapter";
import { Prompts } from "./External/prompts";
import { ParserStateManager } from "./Parsers/ParserStateManager";
import { ParserIntroduction } from "./Parsers/Steps/ParserIntroduction";
import { ParserStates } from "./Parsers/ParserStates";
import { SelectParser } from "./Parsers/Steps/SelectParser";
import { SelectFormat } from "./Parsers/Steps/SelectFormat";
import { XMLParserFactory } from "./Parsers/Factories/XMLParserFactory";
import { ParserProccessor } from "./Parsers/Steps/ParserProcessor";
import { LocalReaderFactory } from "./Parsers/Factories/LocalReaderFactory";
import { SelectPath } from "./Parsers/Steps/SelectPath";
import { InputDataProcessor } from "./Parsers/Steps/InputDataProcessor";
import { WebReaderFactory } from "./Parsers/Factories/WebReaderFactory";
import { logErrorToFile } from "../utilities/logToErrorFile";

async function main() {
  console.error = function (...args: any[]) {
    const errorMessage = args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
      .join(" ");

    logErrorToFile(errorMessage);
  };

  const prompts = new PromptsAdapter(new Prompts());
  const introduction = new ParserIntroduction(prompts);
  const selectParser = new SelectParser(prompts);
  const selectFormat = new SelectFormat(prompts);
  const selectPath = new SelectPath(prompts);
  const parserProcessor = new ParserProccessor();
  const inputDataProcessor = new InputDataProcessor();

  const xmlParserLocal = new XMLParserFactory().createParser();

  const localReader = new LocalReaderFactory().createReader();
  const webReader = new WebReaderFactory().createReader();

  const parsers = [xmlParserLocal];
  const readers = [localReader, webReader];

  const manager = new ParserStateManager(
    parsers,
    readers,
    introduction,
    selectParser,
    selectFormat,
    selectPath,
    parserProcessor,
    inputDataProcessor
  );

  manager.next({ currentState: ParserStates.STATE_APP_STARTED });

  // p.outro(
  //   `${color.bgMagenta(
  //     color.black(`Thank you for participating. You are now a CLI expert.`)
  //   )}`
  // );
}

main().catch(console.error);
