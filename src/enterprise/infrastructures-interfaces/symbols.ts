import { createRegisterSymbol } from 'src/infrastructures/di/inversify-helper';
import { Config } from './config';
import { IFetchService } from './fetch-service';
import { IMessagesService } from './messages-service';
import { IJWTService } from './jwt-service';
import { IGuidProvider } from './guid-provider';
import { IDispatchProvider } from './dispatch-provider';
import { IMessagesOperators } from './messages-operators';
import { IThemeOperators } from './theme-operators';

export const infrastructuresSymbols = {
  config: createRegisterSymbol<Config>(),
  fetchService: createRegisterSymbol<IFetchService>(),
  guidProvider: createRegisterSymbol<IGuidProvider>(),
  messagesService: createRegisterSymbol<IMessagesService>(),
  jwtService: createRegisterSymbol<IJWTService>(),
  dispatchProvider: createRegisterSymbol<IDispatchProvider>(),
  messagesOperators: createRegisterSymbol<IMessagesOperators>(),
  themeOperators: createRegisterSymbol<IThemeOperators>(),
};
