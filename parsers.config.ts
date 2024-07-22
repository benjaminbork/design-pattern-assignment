interface ParserConfigInterface {
  parserKey: string;
  parserLabel: string;
  formats: Array<string>;
}

export const parsersConfig: Array<ParserConfigInterface> = [
  {
    parserKey: "xml_local_file",
    parserLabel: "XML - Local File",
    formats: ["json"],
  },
];
