import * as p from "@clack/prompts";
import color from "picocolors";
import { PromptsInterface } from "../Parsers/PromptsInterface";

export class Prompts implements PromptsInterface {
  public intro(introductionText: string): void {
    p.intro(`${color.bgMagenta(color.black(introductionText))}`);
  }

  public async select(
    options: Array<{ label: string; value: string }>,
    message: string
  ): Promise<string> {
    if (options.length === 0) {
      throw new Error("Options must be provided and cannot be empty.");
    }

    const selection = await p.select({
      message,
      options: options.map((option) => ({
        value: option.value,
        label: option.label,
      })),
    });

    if (typeof selection !== "string") {
      throw new Error("Selection must be a string.");
    }

    return selection;
  }
}
