import { ParserInterface } from "../ParserInterface";

export class ParserProccessor {
  private parsers: ParserInterface[] = [];

  public process(
    selectedParser: string,
    selectedFormat: string,
    parsers: ParserInterface[],
    data: string
  ): string {
    const parser = parsers.find((parser) =>
      parser.canHandle({
        format: selectedFormat || "",
        parser: selectedParser || "",
      })
    );

    if (!parser) {
      throw new Error("Parser not found");
    }

    return parser.parse({
      data,
      format: selectedFormat || "",
    });
  }
}
