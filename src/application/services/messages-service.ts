import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/di/inversify-helper';
import { IGuidProvider } from 'src/enterprise/interfaces/helpers/guid-provider';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { IMessagesOperators } from 'src/infrastructures/stores/messages/operators-interface';
import { IMessagesService } from 'src/application/interfaces/services/messages-service';
import {
  MessageGenerator,
  MessageGeneratorArgs,
} from 'src/enterprise/messages/message';

@injectable()
export class MessagesService implements IMessagesService {
  constructor(
    @inject(symbols.messagesOperators)
    private messagesOperators: IMessagesOperators,
    @inject(symbols.guidProvider) private guidProvider: IGuidProvider,
  ) {}
  public clear = () => this.messagesOperators.clear({});
  public removeMessage = (id: string) =>
    this.messagesOperators.removeMessage({ id });
  public showMessages = (...messageGenerators: MessageGenerator[]) => {
    this.showMessagesInner(false, ...messageGenerators);
  };
  public appendMessages = (...messageGenerators: MessageGenerator[]) => {
    this.showMessagesInner(true, ...messageGenerators);
  };
  private showMessagesInner = (
    append: boolean,
    ...messageGenerators: MessageGenerator[]
  ) => {
    const args: MessageGeneratorArgs[] = messageGenerators.map(generator => ({
      id: this.guidProvider.newGuid(),
      generator,
    }));
    this.messagesOperators.showMessages({
      messageGeneratorArgs: args,
      append,
    });
  };
}
