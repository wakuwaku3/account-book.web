import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Checkbox,
  Fab,
} from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { AccountsSelectors } from 'src/adapter/stores/accounts/selectors';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/adapter/stores/stored-state';
import { resolve } from 'src/application/use-cases/di/di-container';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { Url } from 'src/enterprise/routing/url';
import { Create, Clear, Add } from '@material-ui/icons';
import { Localizer } from 'src/enterprise/location/localizer';
import { PlanItem } from 'src/enterprise/plan/plan-item';
import { History } from 'history';
import { PlanSelectors } from 'src/adapter/stores/plan/selectors';
import { TableCell } from 'src/web/components/table/table-cell';

const styles = createStyles({
  root: { padding: 20 },
  tableContainer: { width: '100%', overflow: 'auto' },
  addBtn: { marginLeft: 20 },
  editBtn: { marginRight: 0 },
  btnColumn: { width: 110, minWidth: 110 },
  dateColumn: { width: 150, minWidth: 150 },
  categoryColumn: { width: 100, minWidth: 100 },
  amountColumn: { width: 100, minWidth: 100 },
  textColumn: { width: 100, minWidth: 100 },
  checkboxColumn: { width: 100, minWidth: 100 },
});
interface Props {
  resources: Resources;
  localizer: Localizer;
  items: PlanItem[];
  history: History;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts, plan }, { history }) => {
  const { items } = new PlanSelectors(plan);
  const { resources, localizer } = new AccountsSelectors(accounts);
  return { resources, localizer, history, items };
};
interface Events {
  loadAsync: () => Promise<void>;
  deletePlanAsync: (id: string) => Promise<void>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { loadAsync, deletePlanAsync } = resolve(symbols.planUseCase);
  return {
    loadAsync,
    deletePlanAsync,
  };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    resources,
    classes,
    loadAsync,
    items,
    history,
    deletePlanAsync,
    localizer,
  } = createPropagationProps(props);
  const {
    root,
    tableContainer,
    editBtn,
    btnColumn,
    dateColumn,
    categoryColumn,
    amountColumn,
    textColumn,
    checkboxColumn,
    addBtn,
  } = classes;
  React.useEffect(() => {
    loadAsync();
  }, []);
  return (
    <Container className={root}>
      <Row>
        <Typography variant="h4">{resources.planIndex}</Typography>
        <Fab
          size="small"
          color="primary"
          className={addBtn}
          onClick={() => history.push(Url.planCreate)}
        >
          <Add />
        </Fab>
      </Row>
      <Row>
        <div className={tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={btnColumn} />
                <TableCell align="left" className={textColumn}>
                  {resources.planName}
                </TableCell>
                <TableCell align="center" className={textColumn}>
                  {resources.interval}
                </TableCell>
                <TableCell align="right" className={amountColumn}>
                  {resources.amount}
                </TableCell>
                <TableCell align="center" className={checkboxColumn}>
                  {resources.isIncome}
                </TableCell>
                <TableCell align="center" className={dateColumn}>
                  {resources.applyStartDate}
                </TableCell>
                <TableCell align="center" className={dateColumn}>
                  {resources.applyEndDate}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell className={btnColumn}>
                    <IconButton
                      color="primary"
                      onClick={() => history.push(Url.getPlanEditUrl(item.id))}
                      className={editBtn}
                    >
                      <Create />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => deletePlanAsync(item.id)}
                    >
                      <Clear />
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="center">
                    {localizer.formatInterval(item.interval)}
                  </TableCell>
                  <TableCell align="right" className={amountColumn}>
                    {localizer.formatMoney(item.amount)}
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      checked={item.isIncome}
                      readOnly={true}
                      disableRipple={true}
                      disableTouchRipple={true}
                    />
                  </TableCell>
                  <TableCell align="center" className={categoryColumn}>
                    {item.start
                      ? localizer.formatDate(new Date(item.start))
                      : ''}
                  </TableCell>
                  <TableCell align="center" className={amountColumn}>
                    {item.end ? localizer.formatDate(new Date(item.end)) : ''}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Row>
    </Container>
  );
};
const StyledInner = decorate(styles)(Inner);
export const PlanIndex = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
