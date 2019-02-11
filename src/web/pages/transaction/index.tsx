import * as React from 'react';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { createStyles, Typography, Fab } from '@material-ui/core';
import { EventMapper } from 'src/infrastructures/stores/types';
import { Resources } from 'src/domains/common/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { withConnectedRouter } from 'src/infrastructures/routing/routing-helper';
import { History } from 'history';
import { AccountsSelectors } from 'src/infrastructures/stores/accounts/selectors';
import { Container } from 'src/web/components/layout/container';
import { Row } from 'src/web/components/layout/row';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/infrastructures/stores/stored-state';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';
import { TransactionMonthPicker } from './month-picker';
import { Add } from '@material-ui/icons';
import { Url } from 'src/infrastructures/routing/url';

const styles = createStyles({
  root: { padding: 20 },
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
  getModelAsync: () => Promise<void>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { getModelAsync } = resolve(symbols.transactionUseCase);
  return {
    getModelAsync,
  };
};
interface State {}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
  }
  public async componentDidMount() {
    const { getModelAsync } = this.props;
    await getModelAsync();
  }
  public render() {
    const { resources, classes, history } = createPropagationProps(this.props);
    const { root } = classes;
    return (
      <Container className={root}>
        <Row>
          <Typography variant="h4">{resources.transactionIndex}</Typography>
          <TransactionMonthPicker />
        </Row>
        <Row>
          <Fab
            color="primary"
            size="small"
            onClick={() => history.push(Url.transactionCreate)}
          >
            <Add />
          </Fab>
        </Row>
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const TransactionIndex = withConnectedRouter(
  mapStateToProps,
  mapEventToProps,
)(StyledInner);
