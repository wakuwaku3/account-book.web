import { ReducerFunctions } from 'src/infrastructures/stores/types';
import State from './state';
import Action from './action';
import { DashboardShowState } from 'src/enterprise/home/dashboard-show-state';

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
    if (
      state.model &&
      state.model.selectedMonth &&
      model.selectedMonth &&
      (state.model.selectedMonth.getFullYear() !==
        model.selectedMonth.getFullYear() ||
        state.model.selectedMonth.getMonth() !== model.selectedMonth.getMonth())
    ) {
      return state;
    }
    return { ...state, model };
  },
  setMonth: (state, month) => {
    return {
      ...state,
      model: state.model ? { ...state.model, selectedMonth: month } : undefined,
    };
  },
};
export default functions;
