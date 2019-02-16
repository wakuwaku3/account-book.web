import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { IActualService } from 'src/use-cases/services/interfaces/actual-service';
import { ActualCreationModel, ActualEditModel } from '../actual/actual-model';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { Message } from '../models/common/message';

@injectable()
export class ActualService implements IActualService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
  ) {}
  public addActualAsync: (
    model: ActualCreationModel,
  ) => Promise<boolean> = async model => {
    const { errors } = await this.fetchService.fetchAsync<{
      errors: string[];
    }>({
      url: ApiUrl.actualEdit(model.planId, model.month),
      methodName: 'POST',
      body: { ...model },
    });
    if (errors && errors.length > 0) {
      this.messagesService.appendMessages(
        ...errors.map(error => () =>
          ({
            level: 'error',
            text: error,
          } as Message),
        ),
      );
      return false;
    }
    return true;
  };
  public editActualAsync: (
    id: string,
    model: ActualEditModel,
  ) => Promise<boolean> = async (id, model) => {
    const { errors } = await this.fetchService.fetchAsync<{
      errors: string[];
    }>({
      url: ApiUrl.actualEdit(id),
      methodName: 'PUT',
      body: { ...model },
    });
    if (errors && errors.length > 0) {
      this.messagesService.appendMessages(
        ...errors.map(error => () =>
          ({
            level: 'error',
            text: error,
          } as Message),
        ),
      );
      return false;
    }
    return true;
  };
}
