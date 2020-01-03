import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/di/inversify-helper';
import { symbols } from 'src/application/use-cases/di/symbols';
import { IMessagesUseCase } from './interfaces/messages-use-case';
import { MessageGenerator } from 'src/enterprise/models/messages/message';

@injectable()
export class MessagesUseCase implements IMessagesUseCase {
  constructor(
    @inject(symbols.messagesService)
    private messagesService: IMessagesUseCase,
  ) {}
  public clear = () => this.messagesService.clear();
  public removeMessage = (id: string) => this.messagesService.removeMessage(id);
  public showMessages = (...messageGenerators: MessageGenerator[]) =>
    this.messagesService.showMessages(...messageGenerators);
  public appendMessages = (...messageGenerators: MessageGenerator[]) =>
    this.messagesService.appendMessages(...messageGenerators);
}
