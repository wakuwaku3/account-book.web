import { Dispatch, AnyAction } from 'redux';
import { IDispatchProvider } from 'src/enterprise/infrastructures-interfaces/dispatch-provider';

export class DispatchProvider implements IDispatchProvider {
  public dispatch = {} as Dispatch<AnyAction>;
}
