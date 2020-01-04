import State from './state';
import Action from './action';
import { ReducerFunctions } from 'src/infrastructures/stores/types';

const setLocalStorage = (state: State) => {
  if (localStorage) {
    localStorage.setItem('accounts', JSON.stringify(state));
  }
};
const functions: ReducerFunctions<State, Action> = {
  signIn: (s, { claim }) => {
    const state = { claim };
    setLocalStorage(state);
    return state;
  },
  signOut: () => {
    const state = {};
    setLocalStorage(state);
    return state;
  },
};
export default functions;
