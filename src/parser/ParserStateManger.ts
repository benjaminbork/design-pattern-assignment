export class ParserStateManager {
  private number: number;
  constructor(number: number) {
    this.number = number;
  }

  public getNumber() {
    return this.number;
  }

  public setNumber(number: number) {
    this.number = number;
  }
}
