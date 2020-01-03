import { CultureInfo } from '../location/culture-infos';
export type MessageLevel = 'error' | 'warning' | 'info' | 'none';
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
