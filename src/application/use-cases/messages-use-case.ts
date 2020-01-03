import { IMessagesUseCase } from './interfaces/messages-use-case';
import { MessageGenerator } from 'src/enterprise/models/messages/message';

export class MessagesUseCase implements IMessagesUseCase {
  constructor(private messagesService: IMessagesUseCase) {}
  public clear = () => this.messagesService.clear();
  public removeMessage = (id: string) => this.messagesService.removeMessage(id);
  public showMessages = (...messageGenerators: MessageGenerator[]) =>
    this.messagesService.showMessages(...messageGenerators);
  public appendMessages = (...messageGenerators: MessageGenerator[]) =>
    this.messagesService.appendMessages(...messageGenerators);
}
