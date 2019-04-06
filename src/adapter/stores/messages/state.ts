import { MessageGeneratorArgs } from 'src/enterprise/messages/message';

export interface MessagesState {
  messageGeneratorArgs: MessageGeneratorArgs[];
}
export const defaultMessagesState: MessagesState = { messageGeneratorArgs: [] };
export default MessagesState;
