import { MessageGenerator } from 'src/enterprise/models/messages/message';
export interface IMessagesUseCase {
  clear: () => void;
  removeMessage: (id: string) => void;
  showMessages: (...messageGenerators: MessageGenerator[]) => void;
  appendMessages: (...messageGenerators: MessageGenerator[]) => void;
}
