import { MessageLevel } from '../fetch/types';
import { CultureInfo } from '../location/culture-infos';

interface MessageInner {
  text: string;
  level: MessageLevel;
  showDuration?: number;
}

export interface Message extends MessageInner {
  id: string;
}
export type MessageGenerator = (cultureInfo: CultureInfo) => MessageInner;
export interface MessageGeneratorArgs {
  id: string;
  generator: MessageGenerator;
}
