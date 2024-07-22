#!/usr/bin/env ts-node

import { PromptsAdapter } from "./Parsers/PomptsAdapter";
import { Prompts } from "./External/prompts";
import { ParserStateManager } from "./Parsers/ParserStateManager";
import { ParserIntroduction } from "./Parsers/Steps/ParserIntroduction";
import { ParserStates } from "./Parsers/ParserStates";
import { SelectParser } from "./Parsers/Steps/SelectParser";
import { SelectFormat } from "./Parsers/Steps/SelectFormat";
import { XMLParserFactory } from "./Parsers/Factories/XMLParserFactory";

async function main() {
  const prompts = new PromptsAdapter(new Prompts());
  const introduction = new ParserIntroduction(prompts);
  const selectParser = new SelectParser(prompts);
  const selectFormat = new SelectFormat(prompts);
  const xmlParser = new XMLParserFactory().createParser();

  const parsers = [xmlParser];

  const manager = new ParserStateManager(
    parsers,
    introduction,
    selectParser,
    selectFormat
  );
  manager.next({ currentState: ParserStates.STATE_APP_STARTED });

  // const xml = "<root><item>Hello World</item></root>";
  // try {
  //   const parser = XMLLocalParserFactory.createParser();
  //   const parsedObject = parser.parse(xml);
  //   console.log(parsedObject);
  // } catch (error) {
  //   console.error(error);
  // }
  // await setTimeout(1000);

  // p.outro(
  //   `${color.bgMagenta(
  //     color.black(`Thank you for participating. You are now a CLI expert.`)
  //   )}`
  // );
}

main().catch(console.error);
