import { ReducerFunctions } from '../types';
import State from './state';
import Action from './action';

const setLocalStorage = (state: State) => {
  if (localStorage) {
    localStorage.setItem('accounts', JSON.stringify(state));
  }
};
const functions: ReducerFunctions<State, Action> = {
  init: state => {
    const newState = { ...state };
    if (newState.claim) {
      newState.claim.isInitialized = false;
    }
    return newState;
  },
  signIn: (s, { result }) => {
    const { claim } = result;
    if (claim) {
      claim.isInitialized = true;
    }
    const state = { claim };
    setLocalStorage(state);
    return state;
  },
};
export default functions;
