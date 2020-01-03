import { ReducerFunctions } from 'src/infrastructures/stores/types';
import State from './state';
import Action from './action';

const functions: ReducerFunctions<State, Action> = {
  clear: s => {
    return { ...s, messageGeneratorArgs: [] };
  },
  removeMessage: (s, { id }) => {
    return {
      ...s,
      messageGeneratorArgs: s.messageGeneratorArgs.filter(x => x.id !== id),
    };
  },
  showMessage: (s, { messageGeneratorArgs, append }) => {
    const array = (append ? s.messageGeneratorArgs : []).concat(
      messageGeneratorArgs,
    );
    return { ...s, messageGeneratorArgs: array };
  },

  showMessages: (s, { messageGeneratorArgs, append }) => {
    const array = (append ? s.messageGeneratorArgs : []).concat(
      messageGeneratorArgs,
    );
    return { ...s, messageGeneratorArgs: array };
  },
};
export default functions;
