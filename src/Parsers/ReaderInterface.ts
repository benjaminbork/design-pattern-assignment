export interface ReaderInterface {
  read({ path }: { path: string }): string;
  canHandle({ path }: { path: string }): boolean;
}
