import * as React from 'react';
import { Claim } from 'src/enterprise/models/accounts/claim';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { EventMapper } from 'src/infrastructures/stores/types';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { connect } from 'react-redux';
import { accountsUseCase } from 'src/application/use-cases/di/container';

interface Events {
  refreshTokenAsync: (claim?: Claim) => Promise<void>;
}
interface Props {
  claim?: Claim;
}
const Inner: React.SFC<Props & Events> = props => {
  const { claim, refreshTokenAsync, children } = props;
  const notInitialized = claim && !claim.isInitialized;
  if (notInitialized) {
    refreshTokenAsync(claim);
  }
  return <React.Fragment>{!notInitialized && children}</React.Fragment>;
};
const mapEventToProps: EventMapper<Events> = dispatch => {
  const { refreshTokenAsync } = accountsUseCase.value;
  return {
    refreshTokenAsync: async state => await refreshTokenAsync(state),
  };
};
const mapStateToProps: StateMapperWithRouter<StoredState, Props> = ({
  accounts,
}) => {
  const { claim } = accounts;
  return {
    claim,
  };
};
const ConnectedInner = connect(mapStateToProps, mapEventToProps)(Inner);
export const AuthenticateProvider = withRouter(ConnectedInner);
