export class XMLLocalParser {
  parse(xml: string): string {
    const domParser = require("xmldom").DOMParser;

    const parser = new domParser();
    const doc = parser.parseFromString(xml, "application/xml");

    const parseError = doc.getElementsByTagName("parsererror");
    if (parseError.length > 0) {
      throw new Error("Error parsing XML");
    }

    const result = this.xmlToJson(doc.documentElement);
    return JSON.stringify(result);
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
}
