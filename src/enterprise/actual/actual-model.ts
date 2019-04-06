export interface ActualModel {
  planName: string;
  planAmount: number;
  actualAmount?: number;
}
export interface ActualEditModel {
  actualAmount: number;
}

export interface ActualKey {
  actualId?: string;
  planId?: string;
  dashboardId?: string;
  month?: Date;
}
