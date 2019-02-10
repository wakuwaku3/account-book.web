import {
  Container,
  RegisterSymbol,
} from 'src/infrastructures/services/inversify-helper';
import { serviceSymbols } from './symbols';
import { DispatchProvider } from '../../../infrastructures/stores/services/dispatch-provider';
import { IDispatchProvider } from './interfaces/dispatch-provider';
import { createAccountsOperators } from '../accounts/operators';
import { Dispatch } from 'redux';
import { createMessagesOperators } from '../messages/operators';
import { createThemeOperators } from '../theme/operators';
import { createHomeIndexOperators } from '../home-index/operators';
const {
  dispatchProvider,
  accountsOperators,
  messagesOperators,
  themeOperators,
  homeIndexOperators,
} = serviceSymbols;

const registerOperators = <TOperators>(
  container: Container,
  symbol: RegisterSymbol<TOperators>,
  factory: (dispatch: Dispatch) => TOperators,
) => {
  container.register(symbol, binder =>
    binder
      .toDynamicValue(c =>
        factory(
          c.container.get<IDispatchProvider>(dispatchProvider.symbol).dispatch,
        ),
      )
      .inSingletonScope(),
  );
};
export const registerServices = (container: Container) => {
  container.register(dispatchProvider, binder =>
    binder.to(DispatchProvider).inSingletonScope(),
  );
  registerOperators(container, accountsOperators, createAccountsOperators);
  registerOperators(container, messagesOperators, createMessagesOperators);
  registerOperators(container, themeOperators, createThemeOperators);
  registerOperators(container, homeIndexOperators, createHomeIndexOperators);
};
