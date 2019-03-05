import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { IPlanOperators } from 'src/infrastructures/stores/plan/operators-interface';
import { IFetchService } from './services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { IMessagesService } from './services/interfaces/messages-service';
import { Message } from 'src/domains/models/common/message';
import { IPlanUseCase } from './interfaces/plan-use-case';
import { PlanEditModel } from 'src/domains/models/plan/plan-model';
import { IPlanService } from './services/interfaces/plan-service';
import { PlanItem } from 'src/domains/models/plan/plan-item';

@injectable()
export class PlanUseCase implements IPlanUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.planOperators)
    private planOperators: IPlanOperators,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
    @inject(symbols.planService)
    private planService: IPlanService,
  ) {}
  public loadAsync = async () => {
    const { items, errors } = await this.fetchService.fetchAsync<{
      items: PlanItem[];
      errors: string[];
    }>({
      url: ApiUrl.planIndex,
      method: 'GET',
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
  public getPlanAsync: (
    id: string,
  ) => Promise<PlanEditModel | undefined> = async id => {
    const { model, errors } = await this.fetchService.fetchAsync<{
      model: PlanEditModel;
      errors: string[];
    }>({
      url: ApiUrl.planEdit(id),
      method: 'GET',
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
  public createPlanAsync = this.planService.createPlanAsync;
  public editPlanAsync = this.planService.editPlanAsync;
  public deletePlanAsync = this.planService.deletePlanAsync;
}
