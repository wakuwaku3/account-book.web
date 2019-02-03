import { Dispatch } from 'redux';
import { ActionCreators, ReducerFunctions, Operators } from './types';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export const createActionCreators = (key: string) => <TAction extends {}>(
  ...actionKeys: Array<keyof TAction & string>
) => {
  const factory = actionCreatorFactory(key);
  return actionKeys.reduce(
    (o, k) => {
      type value = TAction[typeof k];
      o[k] = factory<value>(k);
      return o;
    },
    {} as ActionCreators<TAction>,
  );
};
export const createReducers = <TState, TAction>(
  actions: ActionCreators<TAction>,
  functions: ReducerFunctions<TState, TAction>,
) => (state: TState) => {
  return Object.keys(actions).reduce((pre, k) => {
    return pre.case(actions[k], functions[k]);
  }, reducerWithInitialState(state));
};
export const createOperators = <TAction extends {}>(
  actionCreators: ActionCreators<TAction>,
) => (dispatch: Dispatch) => {
  return Object.entries(actionCreators).reduce(
    (o, [k, v]) => {
      const func = v as any;
      o[k] = (p: any) => dispatch(func(p));
      return o;
    },
    {} as Operators<TAction>,
  );
};
