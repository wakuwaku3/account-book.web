import { IMessagesOperators } from 'src/enterprise/infrastructures-interfaces/messages-operators';
import { IMessagesService } from 'src/enterprise/infrastructures-interfaces/messages-service';
import { IGuidProvider } from 'src/enterprise/infrastructures-interfaces/guid-provider';
import {
  MessageGenerator,
  MessageGeneratorArgs,
} from 'src/enterprise/models/messages/message';

export class MessagesService implements IMessagesService {
  constructor(
    private messagesOperators: IMessagesOperators,
    private guidProvider: IGuidProvider,
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
