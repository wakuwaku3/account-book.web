import * as React from 'react';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { MessageBar } from './message-bar';
import { Theme } from 'src/infrastructures/styles/theme';
import { Message } from 'src/domains/models/common/message';
import {
  decorate,
  appendClassName,
} from 'src/infrastructures/styles/styles-helper';
import { createStyles } from '@material-ui/core';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      zIndex: theme.zIndex.snackbar,
      width: 0,
    },
    bar: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    'root-vertical-top': { top: 12 },
    'root-vertical-center': { top: 12, bottom: 12 },
    'root-vertical-bottom': { bottom: 12 },
    'root-horizontal-left': { left: 12 },
    'root-horizontal-center': { left: 12, right: 12 },
    'root-horizontal-right': { right: 12 },
  });
export interface MessageContainerProps {
  clear?: () => void;
  close?: (id: string) => void;
  messages: Message[];
  anchorOrigin?: SnackbarOrigin;
}
export const MessageContainer = decorate(styles)<MessageContainerProps>(
  props => {
    const {
      clear,
      messages,
      close,
      anchorOrigin,
      classes,
    } = createPropagationProps(props);
    const { root, bar } = classes;
    const classNames = [root];
    if (anchorOrigin) {
      classNames.push(classes['root-vertical-' + anchorOrigin.vertical]);
      classNames.push(classes['root-horizontal-' + anchorOrigin.horizontal]);
    }
    const className = appendClassName(...classNames);
    return (
      <div className={className}>
        {messages &&
          messages.map((m, i) => {
            return (
              <MessageBar
                key={m.id}
                anchorOrigin={anchorOrigin}
                message={m}
                clear={clear}
                close={() => {
                  if (close) {
                    close(m.id);
                  }
                }}
                className={bar}
              />
            );
          })}
      </div>
    );
  },
);
MessageContainer.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
};
