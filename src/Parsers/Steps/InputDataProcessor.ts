import { ReaderInterface } from "../ReaderInterface";

export class InputDataProcessor {
  public process({
    readers,
    path,
  }: {
    readers: ReaderInterface[];
    path: string;
  }) {
    const reader = readers.find((reader) => reader.canHandle({ path }));

    if (!reader) {
      throw new Error("No reader found");
    }

    return reader.read({
      path,
    });
  }
}
