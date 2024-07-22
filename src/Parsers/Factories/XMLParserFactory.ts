import { AbstractParserFactory } from "../AbstractParserFactory";
import { ParserInterface } from "../ParserInterface";

export class XMLParserFactory extends AbstractParserFactory {
  public createParser(): ParserInterface {
    const domParser = require("xmldom").DOMParser;

    const parser = new domParser();

    return new (class implements ParserInterface {
      public canHandle({ parser, format }: { parser: string; format: string }) {
        return (format === "json" || format === "csv") && parser === "xml";
      }

      public parse({ data, format }: { data: string; format: string }): string {
        const doc = parser.parseFromString(data, "application/xml");
        const items = doc.getElementsByTagName("item");

        const parseError = doc.getElementsByTagName("parsererror");
        if (parseError.length > 0) {
          throw new Error("Error parsing XML");
        }

        switch (format) {
          case "csv":
            return this.xmlToCSV(items);

          default:
            throw new Error("Unsupported format");
        }
      }

      private xmlToCSV(items: Element[]): string {
        if (items.length === 0) {
          throw new Error("No items found in the XML.");
        }

        const headers: Set<string> = new Set();
        const rows: any[] = [];

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const row: any = {};

          for (let j = 0; j < item.childNodes.length; j++) {
            const child = item.childNodes[j];
            if (child.nodeType === 1) {
              const tagName = child.nodeName;
              headers.add(tagName);
              let textContent = child.textContent?.trim() || "";
              if (textContent.startsWith("<![CDATA[")) {
                textContent = textContent
                  .replace("<![CDATA[", "")
                  .replace("]]>", "");
              }
              row[tagName] = textContent;
            }
          }

          rows.push(row);
        }

        const headersArray = Array.from(headers);
        const csvRows = [headersArray.join(",")];

        rows.forEach((row) => {
          const rowArray = headersArray.map((header) => {
            const value = row[header] !== undefined ? row[header] : "";
            return `"${value.replace(/"/g, '""')}"`;
          });
          csvRows.push(rowArray.join(","));
        });

        return csvRows.join("\n");
      }
    })();
  }
}
