export interface ITransactionUseCase {
  getModelAsync: (selectedMonth?: string) => Promise<void>;
}
