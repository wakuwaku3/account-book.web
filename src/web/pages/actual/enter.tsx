import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  CircularProgress,
  Typography,
  Button,
} from '@material-ui/core';
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
import {
  ActualCreationModel,
  ActualEditModel,
  ActualModel,
} from 'src/domains/actual/actual-model';
import { Url } from 'src/infrastructures/routing/url';
import { Form } from 'src/web/components/forms-controls/form';
import { Localizer } from 'src/domains/common/location/localizer';
import { Clear, Save, Sync } from '@material-ui/icons';
import { TextBox } from 'src/web/components/forms-controls/text-box';
import { resolve } from 'src/use-cases/common/di-container';
import { symbols } from 'src/use-cases/common/di-symbols';

const styles = createStyles({
  root: { padding: 20, maxWidth: 1024, margin: 'auto' },
  btnRow: { justifyContent: 'flex-end', flexGrow: 1, textAlign: 'right' },
  btn: {
    maxWidth: 120,
    marginRight: 10,
    height: '100%',
    '&:last-child': {
      marginRight: 0,
    },
  },
  progressContainer: {
    justifyContent: 'center',
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
});
interface Props {
  resources: Resources;
  localizer: Localizer;
  history: History;
  id: string;
  month: string;
}
interface Param {
  id: string;
  month: string;
}
interface OwnProps {}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  OwnProps
> = ({ accounts }, { history, match }) => {
  const { id, month } = match.params;
  const { resources, localizer } = new AccountsSelectors(accounts);
  return { resources, localizer, history, id, month };
};
interface Events {
  getActualAsync: (
    id: string,
    month?: string,
  ) => Promise<ActualModel | undefined>;
  addActualAsync: (model: ActualCreationModel) => Promise<boolean>;
  editActualAsync: (id: string, model: ActualEditModel) => Promise<boolean>;
}
const mapEventToProps: EventMapper<Events, OwnProps> = dispatch => {
  const { getActualAsync, addActualAsync, editActualAsync } = resolve(
    symbols.actualUseCase,
  );
  return { getActualAsync, addActualAsync, editActualAsync };
};
const getDefault: () => ActualModel = () => {
  return {
    name: '',
    planAmount: 0,
    actualAmount: 0,
    month: '',
  };
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const {
    resources,
    classes,
    id,
    getActualAsync,
    addActualAsync,
    editActualAsync,
    history,
    localizer,
  } = createPropagationProps(props);
  const [model, setModel] = React.useState(getDefault());
  const { actualAmount, planAmount, month, name } = model;
  const [loading, setLoading] = React.useState(true);
  const reset = async () => {
    setLoading(true);
    try {
      const newModel = await getActualAsync(id, month);
      if (newModel) {
        setModel(newModel);
      }
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    reset();
  }, [id, month]);
  const submit = async () => {
    setLoading(true);
    try {
      const hasError = month
        ? await addActualAsync({
            actualAmount: model.actualAmount,
            month,
            planId: id,
          })
        : await editActualAsync(id, model);
      if (!hasError) {
        history.push(Url.root);
      }
    } finally {
      setLoading(false);
    }
  };
  const copy = () => {
    setModel({ ...model, actualAmount: planAmount });
  };
  const { root, progressContainer, btnRow, btn } = classes;
  return loading ? (
    <div className={progressContainer}>
      <CircularProgress />
    </div>
  ) : (
    <Container className={root}>
      <Form onSubmit={submit}>
        <Row>
          <Typography variant="h4">
            {month
              ? `${resources.actualEnter} - ${localizer.formatMonth(
                  new Date(month),
                )}`
              : resources.actualEnter}
          </Typography>
          <div className={btnRow}>
            <Button
              type="button"
              color="secondary"
              className={btn}
              onClick={reset}
            >
              <Clear />
              {resources.reset}
            </Button>
            <Button
              type="button"
              color="primary"
              className={btn}
              onClick={copy}
            >
              <Sync />
              {resources.copy}
            </Button>
            <Button type="submit" color="primary" className={btn}>
              <Save />
              {resources.save}
            </Button>
          </div>
        </Row>
        <Row>
          <TextBox
            value={name}
            label={resources.planName}
            InputProps={{
              readOnly: true,
            }}
          />
        </Row>
        <Row>
          <TextBox
            value={planAmount}
            label={resources.planAmount}
            InputProps={{
              readOnly: true,
            }}
          />
        </Row>
        <Row>
          <TextBox
            value={actualAmount}
            label={resources.actualAmount}
            autoFocus={true}
            onChange={e =>
              setModel({
                ...model,
                actualAmount: Number(e.currentTarget.value),
              })
            }
          />
        </Row>
      </Form>
    </Container>
  );
};
const StyledInner = decorate(styles)(Inner);
export const PlanEnter = withConnectedRouter(mapStateToProps, mapEventToProps)(
  StyledInner,
);
