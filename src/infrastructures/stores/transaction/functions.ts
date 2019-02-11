import { ReducerFunctions } from '../types';
import State from './state';
import Action from './action';

const functions: ReducerFunctions<State, Action> = {
  setModel: (state, payload) => {
    const model = { ...state.model, ...payload };
    return { ...state, model };
  },
};
export default functions;
