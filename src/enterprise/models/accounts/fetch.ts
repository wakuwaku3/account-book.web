export type MethodName = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface FetchResponse<TResult> {
  hasError: boolean;
  result?: TResult;
}
export interface FetchRequest {
  body?: object;
  url: string;
  method?: MethodName;
}
