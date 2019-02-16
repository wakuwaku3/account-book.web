import * as React from 'react';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { createStyles, Typography, Button } from '@material-ui/core';
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
import { getDefaultCategoryId } from 'src/domains/models/transaction/category';
import { TextBox } from 'src/web/components/forms-controls/text-box';
import { TransactionCreationModel } from 'src/domains/models/transaction/transaction-model';
import { Form } from 'src/web/components/forms-controls/form';
import { Url } from 'src/infrastructures/routing/url';

const styles = createStyles({
  root: { padding: 20 },
});
interface Props {
  resources: Resources;
  history: History;
}
interface Param {
  id: string;
}
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
  createTransactionAsync: (model: TransactionCreationModel) => Promise<boolean>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  return {};
};
interface State {
  model: TransactionCreationModel;
}
class Inner extends StyledComponentBase<typeof styles, Props & Events, State> {
  constructor(props: any) {
    super(props);
    this.state = { model: { categoryId: getDefaultCategoryId(), note: '' } };
  }
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { model } = this.state;
    const { name, value } = e.currentTarget;
    this.setState({ model: { ...model, [name]: value } });
  };
  private submit = async () => {
    const { model } = this.state;
    const { createTransactionAsync, history } = this.props;
    const hasError = await createTransactionAsync(model);
    if (!hasError) {
      history.push(Url.transaction);
    }
  };
  public render() {
    const { resources, classes } = createPropagationProps(this.props);
    const { root } = classes;
    const { model } = this.state;
    const { amount, categoryId, note } = model;
    return (
      <Container className={root}>
        <Form onSubmit={this.submit}>
          <Row>
            <Typography variant="h4">{resources.transactionCreate}</Typography>
          </Row>
          <Row>
            <TextBox
              value={amount ? amount : amount === 0 ? amount : ''}
              name="amount"
              type="number"
              label={resources.amount}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <TextBox
              value={categoryId}
              name="categoryId"
              label={resources.category}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <TextBox
              value={note}
              name="note"
              label={resources.note}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <Button type="submit" color="primary" variant="outlined">
              {resources.save}
            </Button>
          </Row>
        </Form>
      </Container>
    );
  }
}
const StyledInner = decorate(styles)(Inner);
export const PlanCreate = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
