export interface TransactionCreationModel {
  amount?: number;
  categoryId: string;
  note: string;
}
export interface TransactionEditModel extends TransactionCreationModel {
  date?: string;
}
