import * as React from 'react';
import { Claim } from 'src/enterprise/accounts/claim';
import { StoredState } from 'src/adapter/stores/stored-state';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { EventMapper } from 'src/infrastructures/stores/types';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { resolve } from 'src/application/use-cases/di/di-container';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { connect } from 'react-redux';

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
  const { refreshTokenAsync } = resolve(symbols.accountsUseCase);
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
