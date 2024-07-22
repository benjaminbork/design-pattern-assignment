export interface ParserInterface {
  parse({ data }: { data: string }): string;
  canHandle({ format }: { format: string }): boolean;
}
