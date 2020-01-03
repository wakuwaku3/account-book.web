import { Dispatch, AnyAction } from 'redux';
import { injectable } from 'inversify';
import { IDispatchProvider } from 'src/enterprise/infrastructures-interfaces/dispatch-provider';

@injectable()
export class DispatchProvider implements IDispatchProvider {
  public dispatch = {} as Dispatch<AnyAction>;
}
