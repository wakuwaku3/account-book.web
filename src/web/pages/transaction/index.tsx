import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography, Fab } from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/enterprise/models/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { AccountsSelectors } from 'src/enterprise/stores/accounts/selectors';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { TransactionMonthPicker } from './month-picker';
import { TransactionList } from './list';
import { Url } from 'src/infrastructures/routing/url';
import { Add } from '@material-ui/icons';
import { History } from 'history';
import { connect } from 'react-redux';
import { transactionUseCase } from 'src/application/use-cases/di/container';

const styles = createStyles({
  transactionIndex: { padding: 20 },
  addBtn: { marginLeft: 20 },
});
interface Props {
  resources: Resources;
  history: History;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history }) => {
  const { resources } = new AccountsSelectors(accounts);
  return { resources, history };
};
interface Events {
  loadAsync: () => Promise<void>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { loadAsync } = transactionUseCase.value;
  return {
    loadAsync,
  };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { resources, classes, loadAsync, history } = createPropagationProps(
    props,
  );
  const { transactionIndex, addBtn } = classes;
  React.useEffect(() => {
    loadAsync();
  }, [loadAsync]);
  return (
    <Container className={transactionIndex}>
      <Row>
        <Typography variant="h4" color="textPrimary">
          {resources.transactionIndex}
        </Typography>
        <Fab
          size="small"
          color="primary"
          className={addBtn}
          onClick={() => history.push(Url.transactionCreate)}
        >
          <Add />
        </Fab>
        <TransactionMonthPicker />
      </Row>
      <Row>
        <TransactionList />
      </Row>
    </Container>
  );
};
const StyledInner = decorate(styles)(Inner);
export const TransactionIndex = withRouter(
  connect(mapStateToProps, mapEventToProps)(StyledInner),
);
