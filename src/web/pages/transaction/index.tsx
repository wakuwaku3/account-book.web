import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { TransactionMonthPicker } from './month-picker';
import { TransactionList } from './list';

const styles = createStyles({
  root: { padding: 20 },
});
interface Props {
  resources: Resources;
}
interface Param {}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, {}) => {
  const { resources } = new AccountsSelectors(accounts);
  return { resources };
};
interface Events {
  getModelAsync: () => Promise<void>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { getModelAsync } = resolve(symbols.transactionUseCase);
  return {
    getModelAsync,
  };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { resources, classes, getModelAsync } = createPropagationProps(props);
  const { root } = classes;
  React.useEffect(() => {
    getModelAsync();
  }, []);
  return (
    <Container className={root}>
      <Row>
        <Typography variant="h4">{resources.transactionIndex}</Typography>
        <TransactionMonthPicker />
      </Row>
      <Row>
        <TransactionList />
      </Row>
    </Container>
  );
};
const StyledInner = decorate(styles)(Inner);
export const TransactionIndex = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(StyledInner);
