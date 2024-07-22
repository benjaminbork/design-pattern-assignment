import fs from "fs";
import path from "path";
import { AbstractReaderFactory } from "../AbstractReaderFactory";
import { ReaderInterface } from "../ReaderInterface";

export class LocalReaderFactory extends AbstractReaderFactory {
  public createReader(): ReaderInterface {
    return new (class implements ReaderInterface {
      public read({ path }: { path: string }): string {
        const data = fs.readFileSync(path, { encoding: "utf-8" });

        if (!data) {
          throw new Error("File not found");
        }

        return data;
      }

      public canHandle({ path }: { path: string }): boolean {
        return (
          path.startsWith("/") ||
          path.startsWith(".") ||
          path.startsWith("~") ||
          path.startsWith("..")
        );
      }
    })();
  }
}
