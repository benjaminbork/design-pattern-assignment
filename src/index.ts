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
import { Database } from "./External/db";
import { DatabaseAdapter } from "./Parsers/DatabaseAdapter";
import { SaveProcessor } from "./Parsers/Steps/SaveProcessor";
import { ParserOutro } from "./Parsers/Steps/ParserOutro";

async function main() {
  // Error handling
  console.error = function (...args: any[]) {
    const errorMessage = args
      .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
      .join(" ");

    console.log("Something went wrong. Please check the error.log file.");
    logErrorToFile(errorMessage);
  };
  const prompts = new PromptsAdapter(new Prompts());
  const db = new DatabaseAdapter(new Database());

  const introduction = new ParserIntroduction(prompts);
  const outro = new ParserOutro(prompts);
  const selectParser = new SelectParser(prompts);
  const selectFormat = new SelectFormat(prompts);
  const selectPath = new SelectPath(prompts);
  const parserProcessor = new ParserProccessor();
  const saveProcessor = new SaveProcessor();
  const inputDataProcessor = new InputDataProcessor();

  const xmlParserLocal = new XMLParserFactory().createParser();

  const localReader = new LocalReaderFactory().createReader();
  const webReader = new WebReaderFactory().createReader();

  const parsers = [xmlParserLocal];
  const readers = [localReader, webReader];

  const manager = new ParserStateManager(
    db,
    parsers,
    readers,
    introduction,
    outro,
    selectParser,
    selectFormat,
    selectPath,
    parserProcessor,
    saveProcessor,
    inputDataProcessor
  );

  manager.next({ currentState: ParserStates.STATE_APP_STARTED });
}

main().catch(console.error);
