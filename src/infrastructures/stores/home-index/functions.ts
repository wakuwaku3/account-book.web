import { ReducerFunctions } from '../types';
import State from './state';
import Action from './action';

const setLocalStorage = (state: State) => {
  if (localStorage) {
    localStorage.setItem('home-index', JSON.stringify(state));
  }
};
const functions: ReducerFunctions<State, Action> = {
  setShowState: (state, payload) => {
    const newState = { ...state, ...payload };
    setLocalStorage(newState);
    return newState;
  },
};
export default functions;
