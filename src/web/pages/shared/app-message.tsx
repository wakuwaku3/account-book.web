import * as React from 'react';
import { MessageContainer } from '../../components/messages/message-container';
import { EventMapper } from 'src/infrastructures/stores/types';
import { MessagesSelectors } from 'src/enterprise/stores/messages/selectors';
import { AccountsSelectors } from 'src/enterprise/stores/accounts/selectors';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { connect } from 'react-redux';
import { Message } from 'src/enterprise/models/messages/message';
import { messagesUseCase } from 'src/application/use-cases/di/container';

interface Events {
  onClear: () => void;
  onRemoveMessage: (id: string) => void;
}
interface Props {
  messages: Message[];
}
const Inner: React.SFC<Events & Props> = ({
  messages,
  onRemoveMessage,
  onClear,
}) => {
  return (
    <MessageContainer
      messages={messages}
      close={id => onRemoveMessage(id)}
      clear={onClear}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    />
  );
};
const mapEventToProps: EventMapper<Events> = () => {
  const useCase = messagesUseCase.value;
  return {
    onRemoveMessage: useCase.removeMessage,
    onClear: useCase.clear,
  };
};
const mapStateToProps: StateMapperWithRouter<StoredState, Props> = ({
  messages,
  accounts,
}) => {
  const { cultureInfo } = new AccountsSelectors(accounts);
  const { getMessages } = new MessagesSelectors(messages);
  return {
    messages: getMessages(cultureInfo),
  };
};

const ConnectedInner = connect(mapStateToProps, mapEventToProps)(Inner);
export const AppMessages = withRouter(ConnectedInner);
