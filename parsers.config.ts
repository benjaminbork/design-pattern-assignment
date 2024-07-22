interface ParserConfigInterface {
  parserKey: string;
  parserLabel: string;
  formats: Array<string>;
}

export const parsersConfig: Array<ParserConfigInterface> = [
  {
    parserKey: "xml",
    parserLabel: "XML",
    formats: ["csv"],
  },
];
