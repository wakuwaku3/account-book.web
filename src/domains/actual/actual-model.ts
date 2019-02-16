export interface ActualModel {
  name: string;
  planAmount: number;
  actualAmount: number;
  month: string;
}
export interface ActualCreationModel {
  planId: string;
  month: string;
  actualAmount: number;
}
export interface ActualEditModel {
  actualAmount: number;
}
