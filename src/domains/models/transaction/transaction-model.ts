export interface TransactionCreationModel {
  amount?: number;
  categoryId: string;
  notes: string;
}
export interface TransactionEditModel extends TransactionCreationModel {
  date?: string;
}
