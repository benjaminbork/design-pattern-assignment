export class ParseDTO {
  public data: string;
  public format: string;

  constructor({ data, format }: { data: string; format: string }) {
    this.data = data;
    this.format = format;
  }
}
