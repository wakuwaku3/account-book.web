import { ReducerFunctions } from '../types';
import State from './state';
import Action from './action';
import { DashboardShowState } from 'src/domains/models/home/dashboard-show-state';

const setLocalStorage = (state: DashboardShowState) => {
  if (localStorage) {
    localStorage.setItem('dashboard-show-state', JSON.stringify(state));
  }
};
const functions: ReducerFunctions<State, Action> = {
  setShowState: (state, showState) => {
    const newShowState = { ...state.showState, ...showState };
    setLocalStorage(newShowState);
    return { ...state, showState: newShowState };
  },
  setModel: (state, model) => {
    return { ...state, model };
  },
};
export default functions;
