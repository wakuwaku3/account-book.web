import { MessageGenerator } from 'src/enterprise/messages/message';

export interface IMessagesService {
  clear: () => void;
  removeMessage: (id: string) => void;
  showMessages: (...messageGenerators: MessageGenerator[]) => void;
  appendMessages: (...messageGenerators: MessageGenerator[]) => void;
}
