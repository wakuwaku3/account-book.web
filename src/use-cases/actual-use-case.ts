import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { IFetchService } from './services/interfaces/fetch-service';
import { IMessagesService } from './services/interfaces/messages-service';
import { IActualUseCase } from './interfaces/actual-use-case';
import { IActualService } from './services/interfaces/actual-service';
import { ActualModel } from 'src/domains/actual/actual-model';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { Message } from 'src/domains/models/common/message';

@injectable()
export class ActualUseCase implements IActualUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
    @inject(symbols.actualService)
    private actualService: IActualService,
  ) {}
  public getActualAsync: (
    id: string,
    month?: string | undefined,
  ) => Promise<ActualModel | undefined> = async (id, month) => {
    const { model, errors } = await this.fetchService.fetchAsync<{
      model: ActualModel;
      errors: string[];
    }>({
      url: ApiUrl.actualEdit(id, month),
      methodName: 'GET',
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
      return undefined;
    }
    return model;
  };
  public addActualAsync = this.actualService.addActualAsync;
  public editActualAsync = this.actualService.editActualAsync;
}
