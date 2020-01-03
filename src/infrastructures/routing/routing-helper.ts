import { withRouter as withRouterBase } from 'react-router';
import { RoutingComponent } from './types';

export const withRouter = <TProps = {}, TParam = {}>(
  component: RoutingComponent<TProps, TParam>,
) => {
  return withRouterBase(component);
};
