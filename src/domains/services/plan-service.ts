import { IPlanService } from 'src/use-cases/services/interfaces/plan-service';
import { PlanEditModel } from '../models/plan/plan-model';
import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { Message } from '../models/common/message';
import { PlanItem } from '../models/plan/plan-item';
import { IPlanOperators } from 'src/infrastructures/stores/plan/operators-interface';

@injectable()
export class PlanService implements IPlanService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
    @inject(symbols.planOperators)
    private planOperators: IPlanOperators,
  ) {}
  public createPlanAsync = async (model: PlanEditModel) => {
    const { errors } = await this.fetchService.fetchAsync<{
      errors: string[];
    }>({
      url: ApiUrl.planCreate,
      methodName: 'POST',
      body: model,
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
  public editPlanAsync = async (id: string, model: PlanEditModel) => {
    const { errors } = await this.fetchService.fetchAsync<{
      errors: string[];
    }>({
      url: ApiUrl.planEdit(id),
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
  public deletePlanAsync = async (id: string) => {
    const { errors, items } = await this.fetchService.fetchAsync<{
      items: PlanItem[];
      errors: string[];
    }>({
      url: ApiUrl.planEdit(id),
      methodName: 'DELETE',
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
      return;
    }
    this.planOperators.setPlans(items);
  };
}
