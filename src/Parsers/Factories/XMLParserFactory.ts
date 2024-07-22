import { AbstractParserFactory } from "../AbstractParserFactory";
import { ParserInterface } from "../ParserInterface";

export class XMLParserFactory extends AbstractParserFactory {
  public createParser(): ParserInterface {
    const domParser = require("xmldom").DOMParser;

    const parser = new domParser();

    return new (class implements ParserInterface {
      public canHandle({ parser, format }: { parser: string; format: string }) {
        return format === "json" && parser === "xml_local_file";
      }

      public parse({ data, format }: { data: string; format: string }): string {
        const doc = parser.parseFromString(data, "application/xml");

        const parseError = doc.getElementsByTagName("parsererror");
        if (parseError.length > 0) {
          throw new Error("Error parsing XML");
        }

        switch (format) {
          case "json":
            const result = this.xmlToJson(doc.documentElement);
            return JSON.stringify(result);
          default:
            throw new Error("Unsupported format");
        }
      }

      private xmlToJson(xml: Element): any {
        let obj: any = {};

        if (xml.nodeType === 1) {
          // Element node
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
              // Ensure the node is an Element
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
              // Text node
              obj = item.nodeValue;
            }
          }
        }
        return obj;
      }
    })();
  }
}
