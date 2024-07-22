#!/usr/bin/env ts-node

import { PromptsAdapter } from "./Parser/PomptsAdapter";
import { Prompts } from "./External/prompts";
import { ParserStateManager } from "./Parser/ParserStateManager";
import { ParserIntroduction } from "./Parser/Steps/ParserIntroduction";
import { ParserStates } from "./Parser/ParserStates";

// Patterns I want to use:
// 1. State pattern
// 2. Strategy pattern
// 3. Abstract Factory pattern
// 4. Factory pattern
// 5. Adapter pattern for external libraries

// Focuse first on the parser, then maybe on the cli interface

async function main() {
  const prompts = new PromptsAdapter(new Prompts());
  const introduction = new ParserIntroduction(prompts);

  const manager = new ParserStateManager(introduction);
  manager.next({ currentState: ParserStates.STATE_PARSER_INITIALIZED });

  // prompts.intro();

  // await p.select({
  //   message: "Select a parser",
  //   options: [
  //     { value: "XMLLocalParser", label: "XML Local Parser" },
  //     { value: "XMLRemoteParser", label: "XML Remote Parser" },
  //   ],
  // });

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
