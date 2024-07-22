import * as p from "@clack/prompts";
import color from "picocolors";

export class Prompts {
  public intro(): void {
    return p.intro(
      `${color.bgMagenta(
        color.black(
          " Welcome. Let us find out how much of a CLI expert you REALLY are. "
        )
      )}`
    );
  }
}
