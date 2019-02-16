import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  TableRow,
  createStyles,
  IconButton,
  Table,
  TableHead,
  TableBody,
} from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { Localizer } from 'src/domains/common/location/localizer';
import { TransactionItem } from 'src/domains/models/transaction/transaction-item';
import { TransactionSelectors } from 'src/infrastructures/stores/transaction/selectors';
import { Create, Clear } from '@material-ui/icons';
import { Url } from 'src/infrastructures/routing/url';
import { TableCell } from 'src/web/components/table/table-cell';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';

const styles = createStyles({
  root: { width: '100%', overflow: 'auto' },
  editBtn: { marginRight: 0 },
  btnColumn: { width: 110, minWidth: 110 },
  dateColumn: { width: 150, minWidth: 150 },
  categoryColumn: { width: 100, minWidth: 100 },
  amountColumn: { width: 100, minWidth: 100 },
  noteColumn: { minWidth: 100 },
});
interface Props {
  resources: Resources;
  history: History;
  localizer: Localizer;
  items: TransactionItem[];
  selectedMonth?: string;
  editable: boolean;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts, transaction }, { history }) => {
  const { items, selectedMonth, editable } = new TransactionSelectors(
    transaction,
  );
  const { resources, localizer } = new AccountsSelectors(accounts);
  return {
    resources,
    history,
    localizer,
    items,
    selectedMonth,
    editable,
  };
};
interface Events {
  deleteTransactionAsync: (id: string) => Promise<void>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { deleteTransactionAsync } = resolve(symbols.transactionUseCase);
  return { deleteTransactionAsync };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    classes,
    items,
    resources,
    history,
    deleteTransactionAsync,
    localizer,
    editable,
  } = createPropagationProps(props);
  if (!items) {
    return null;
  }
  const {
    root,
    editBtn,
    btnColumn,
    dateColumn,
    categoryColumn,
    amountColumn,
    noteColumn,
  } = classes;
  return (
    <div className={root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={btnColumn} />
            <TableCell align="right" className={dateColumn}>
              {resources.transactionDate}
            </TableCell>
            <TableCell align="right" className={categoryColumn}>
              {resources.category}
            </TableCell>
            <TableCell align="right" className={amountColumn}>
              {resources.amount}
            </TableCell>
            <TableCell align="left" className={noteColumn}>
              {resources.note}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell className={btnColumn}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    history.push(Url.getTransactionEditUrl(item.id))
                  }
                  className={editBtn}
                  disabled={!editable}
                >
                  <Create />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => deleteTransactionAsync(item.id)}
                  disabled={!editable}
                >
                  <Clear />
                </IconButton>
              </TableCell>
              <TableCell align="right" className={dateColumn}>
                {localizer.formatDateTime(new Date(item.date))}
              </TableCell>
              <TableCell align="right" className={categoryColumn}>
                {resources.getCategoryName(item.categoryId)}
              </TableCell>
              <TableCell align="right" className={amountColumn}>
                {localizer.formatMoney(item.amount)}
              </TableCell>
              <TableCell align="left" className={noteColumn}>
                {item.note}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
const StyledInner = decorate(styles)(Inner);
export const TransactionList = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(StyledInner);
