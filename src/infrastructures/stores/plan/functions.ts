import { ReducerFunctions } from '../types';
import State from './state';
import Action from './action';

const functions: ReducerFunctions<State, Action> = {
  setPlans: (state, payload) => {
    return { items: payload };
  },
};
export default functions;
