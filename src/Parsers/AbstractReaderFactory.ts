import { ReaderInterface } from "./ReaderInterface";

export abstract class AbstractReaderFactory {
  public abstract createReader(): ReaderInterface;
}
