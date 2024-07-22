export interface ParserInterface {
  parse({ data, format }: { data: string; format: string }): string;
}
