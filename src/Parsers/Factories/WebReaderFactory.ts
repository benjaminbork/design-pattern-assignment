import axios from "axios";
import { AbstractReaderFactory } from "../AbstractReaderFactory";
import { ReaderInterface } from "../ReaderInterface";

export class WebReaderFactory extends AbstractReaderFactory {
  public createReader(): ReaderInterface {
    return new (class implements ReaderInterface {
      public async read({ path }: { path: string }): Promise<string> {
        const response = await axios.get(path);

        if (!response) {
          throw new Error("File not found");
        }

        return response.data;
      }

      public canHandle({ path }: { path: string }): boolean {
        return path.startsWith("http");
      }
    })();
  }
}
