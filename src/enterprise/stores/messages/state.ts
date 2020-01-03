import { MessageGeneratorArgs } from 'src/enterprise/models/messages/message';
export interface MessagesState {
  messageGeneratorArgs: MessageGeneratorArgs[];
}
export const defaultMessagesState: MessagesState = { messageGeneratorArgs: [] };
export default MessagesState;
