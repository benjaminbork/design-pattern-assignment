export interface ReaderInterface {
  read({ path }: { path: string }): Promise<string>;
  canHandle({ path }: { path: string }): boolean;
}
