import { ReducerFunctions } from 'src/infrastructures/stores/types';
import State from './state';
import Action from './action';

const functions: ReducerFunctions<State, Action> = {
  setModel: (state, payload) => {
    if (
      state.model &&
      state.model.selectedMonth &&
      payload.selectedMonth &&
      (state.model.selectedMonth.getFullYear() !==
        payload.selectedMonth.getFullYear() ||
        state.model.selectedMonth.getMonth() !==
          payload.selectedMonth.getMonth())
    ) {
      return state;
    }
    const model = { ...state.model, ...payload };
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
