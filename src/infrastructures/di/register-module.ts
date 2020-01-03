import { Container } from 'src/infrastructures/di/inversify-helper';
import { GuidProvider } from '../helpers/guid-provider';
import { MessagesService } from '../messages/messages-service';
import { JWTService } from '../jwt/jwt-service';
import { config } from '../env/config';
import { infrastructuresSymbols } from 'src/enterprise/infrastructures-interfaces/symbols';
import { FetchService } from 'src/enterprise/services/accounts/fetch-service';

export const registerServices = (container: Container) => {
  container.register(infrastructuresSymbols.config, binder =>
    binder.toConstantValue(config),
  );
  container.register(infrastructuresSymbols.fetchService, binder =>
    binder.to(FetchService).inSingletonScope(),
  );
  container.register(infrastructuresSymbols.guidProvider, binder =>
    binder.to(GuidProvider).inSingletonScope(),
  );
  container.register(infrastructuresSymbols.messagesService, binder =>
    binder.to(MessagesService).inSingletonScope(),
  );
  container.register(infrastructuresSymbols.jwtService, binder =>
    binder.to(JWTService).inSingletonScope(),
  );
};
