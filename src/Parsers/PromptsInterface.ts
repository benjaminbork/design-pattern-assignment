import { outro } from "@clack/prompts";

export interface PromptsInterface {
  intro(introductionText: string): void;
  select(
    options: Array<{ label: string; value: string }>,
    message: string
  ): Promise<string>;

  input(message: string): Promise<string>;
  outro(outroText: string): Promise<void>;
}
