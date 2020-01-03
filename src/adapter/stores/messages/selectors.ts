import { MessagesState } from './state';
import { MessageGeneratorArgs } from 'src/enterprise/messages/message';
import { CultureInfo } from 'src/enterprise/location/culture-infos';

export class MessagesSelectors implements MessagesState {
  public messageGeneratorArgs: MessageGeneratorArgs[] = [];
  constructor(state: MessagesState) {
    Object.assign(this, state);
  }
  public getMessages = (cultureInfo: CultureInfo) =>
    this.messageGeneratorArgs.map(({ id, generator }) => ({
      id,
      ...generator(cultureInfo),
    }));
}
