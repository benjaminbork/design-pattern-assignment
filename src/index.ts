#!/usr/bin/env ts-node

import { PromptsAdapter } from "./Parser/PomptsAdapter";
import { Prompts } from "./External/prompts";
import { ParserStateManager } from "./Parser/ParserStateManager";
import { ParserIntroduction } from "./Parser/Steps/ParserIntroduction";
import { ParserStates } from "./Parser/ParserStates";
import { SelectParser } from "./Parser/Steps/SelectParser";
import { SelectFormat } from "./Parser/Steps/SelectFormat";

async function main() {
  const prompts = new PromptsAdapter(new Prompts());
  const introduction = new ParserIntroduction(prompts);
  const selectParser = new SelectParser(prompts);
  const selectFormat = new SelectFormat(prompts);

  const manager = new ParserStateManager(
    introduction,
    selectParser,
    selectFormat
  );
  manager.next({ currentState: ParserStates.STATE_APP_STARTED });

  // await p.select({
  //   message: "Select a target format",
  //   options: [{ value: "JSON", label: "JSON" }],
  // });

  // Business Logic

  // 1. Select a parser (First create XML for local files, later for remote files)
  // 2. Parse the data
  // 3. Output the parsed data
  // 4. Save the parsed data

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
