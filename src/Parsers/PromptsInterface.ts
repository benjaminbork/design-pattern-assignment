export interface PromptsInterface {
  intro(introductionText: string): void;
  select(
    options: Array<{ label: string; value: string }>,
    message: string
  ): Promise<string>;
}
