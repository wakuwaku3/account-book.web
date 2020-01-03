import { MessagesState } from './state';
import { CultureInfo } from 'src/enterprise/models/location/culture-infos';
import { MessageGeneratorArgs } from 'src/enterprise/models/messages/message';

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
