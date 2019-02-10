import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Paper } from '@material-ui/core';
import {
  decorate,
  appendClassName,
} from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { Theme } from 'src/infrastructures/styles/theme';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderLeftStyle: 'solid',
      borderLeftWidth: 10,
    },
    ...theme.shared.labelCard,
  });
interface Props {
  color?: 'indigo' | 'yellow' | 'red';
}
const Inner: StyledSFC<typeof styles, Props> = props => {
  const { children, classes, color } = createPropagationProps(props);
  const { root, yellow } = classes;
  return (
    <Paper className={appendClassName(root, color ? classes[color] : yellow)}>
      {children}
    </Paper>
  );
};
export const LabelCard = decorate(styles)(Inner);
