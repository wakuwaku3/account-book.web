import { withRouter as withRouterBase } from 'react-router';
import { RoutingComponent, StateMapperWithRouter, RoutingProps } from './types';
import { connect, InferableComponentEnhancerWithProps } from 'react-redux';
import { EventMapper } from '../stores/types';

type FirstArgs<T> = T extends (a1: infer A1, ...rest: any[]) => any
  ? A1
  : never;

export const withRouter = <TProps = {}, TParam = {}>(
  component: RoutingComponent<TProps, TParam>,
) => {
  return withRouterBase(component);
};
export const withConnectedRouter = <
  TStoredState = {},
  TProps = {},
  TEvents = {},
  TParam = {},
  TOwnProps = {}
>(
  mapStateToProps: StateMapperWithRouter<
    TStoredState,
    TProps,
    TParam,
    TOwnProps
  >,
  mapEventToProps: EventMapper<TEvents, TOwnProps> = () => ({}),
) => (
  component: FirstArgs<
    InferableComponentEnhancerWithProps<
      RoutingProps<Partial<TProps> & Partial<TEvents>, TParam>,
      TOwnProps
    >
  >,
) => {
  const c = connect(mapStateToProps, mapEventToProps)(component);
  return withRouter(c);
};
