#!/usr/bin/env ts-node

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";

async function main() {
  p.intro(
    `${color.bgMagenta(
      color.black(
        " Welcome. Let us find out how much of a CLI expert you REALLY are. "
      )
    )}`
  );

  await setTimeout(1000);
  console.log("Goodbye!");
}

main().catch(console.error);
