import { MethodName } from './types';

export interface FetchRequest {
  body?: object;
  url: string;
  method?: MethodName;
}
