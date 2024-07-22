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
          case "json":
            const result = this.xmlToJson(doc.documentElement);
            return JSON.stringify(result);

          case "csv":
            return this.xmlToCSV(items);

          default:
            throw new Error("Unsupported format");
        }
      }

      private xmlToJson(xml: Element): any {
        let obj: any = {};

        if (xml.nodeType === 1) {
          if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
              const attribute = xml.attributes.item(j);
              if (attribute) {
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
              }
            }
          }
        }

        if (xml.hasChildNodes()) {
          for (let i = 0; i < xml.childNodes.length; i++) {
            const item = xml.childNodes.item(i);
            if (item.nodeType === 1) {
              const nodeName = item.nodeName;
              if (typeof obj[nodeName] === "undefined") {
                obj[nodeName] = this.xmlToJson(item as Element);
              } else {
                if (typeof obj[nodeName].push === "undefined") {
                  const old = obj[nodeName];
                  obj[nodeName] = [];
                  obj[nodeName].push(old);
                }
                obj[nodeName].push(this.xmlToJson(item as Element));
              }
            } else if (item.nodeType === 3) {
              obj = item.nodeValue;
            }
          }
        }
        return obj;
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
