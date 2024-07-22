export interface ParserInterface {
  parse({ data, format }: { data: string; format: string }): string;
  canHandle({ parser, format }: { parser: string; format: string }): boolean;
}
