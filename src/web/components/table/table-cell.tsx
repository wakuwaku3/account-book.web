import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles } from '@material-ui/core';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { TableCell as MuiTableCell } from '@material-ui/core';
import { TableCellProps as MuiTableCellProps } from '@material-ui/core/TableCell';

const styles = createStyles({
  root: { padding: 5 },
});
export interface TableCellProps extends MuiTableCellProps {}
const Inner: StyledSFC<typeof styles, TableCellProps> = props => {
  const { classes, ...others } = createPropagationProps(props);
  const { root } = classes;
  return <MuiTableCell {...others} className={root} />;
};
export const TableCell = decorate(styles)(Inner);
