import { MessageGeneratorArgs } from '../models/messages/message';

export interface IMessagesOperators {
  clear: (payload: {}) => void;
  removeMessage: (payload: { id: string }) => void;
  showMessage: (payload: {
    messageGeneratorArgs: MessageGeneratorArgs;
    append?: boolean;
  }) => void;
  showMessages: (payload: {
    messageGeneratorArgs: MessageGeneratorArgs[];
    append?: boolean;
  }) => void;
}
