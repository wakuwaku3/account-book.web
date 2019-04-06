import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { IMessagesUseCase } from 'src/application/interfaces/usecases/messages-use-case';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { MessageGenerator } from 'src/enterprise/messages/message';

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
