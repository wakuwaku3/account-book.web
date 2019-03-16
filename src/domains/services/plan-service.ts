import { IPlanService } from 'src/use-cases/services/interfaces/plan-service';
import { PlanEditModel } from '../models/plan/plan-model';
import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { PlanItem } from '../models/plan/plan-item';
import { IPlanOperators } from 'src/infrastructures/stores/plan/operators-interface';

@injectable()
export class PlanService implements IPlanService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.planOperators)
    private planOperators: IPlanOperators,
  ) {}
  public createPlanAsync = async (model: PlanEditModel) => {
    const { hasError } = await this.fetchService.fetchWithCredentialAsync<{}>({
      url: ApiUrl.planIndex,
      method: 'POST',
      body: model,
    });
    return hasError;
  };
  public editPlanAsync = async (id: string, model: PlanEditModel) => {
    const { hasError } = await this.fetchService.fetchWithCredentialAsync<{}>({
      url: ApiUrl.planEdit(id),
      method: 'PUT',
      body: { ...model },
    });
    return hasError;
  };
  public deletePlanAsync = async (id: string) => {
    const { hasError } = await this.fetchService.fetchWithCredentialAsync<{
      items: PlanItem[];
      errors: string[];
    }>({
      url: ApiUrl.planEdit(id),
      method: 'DELETE',
    });
    if (hasError) {
      return;
    }
    await this.getPlansAsync();
  };
  public getPlansAsync = async () => {
    const {
      hasError,
      result,
    } = await this.fetchService.fetchWithCredentialAsync<{
      plans: PlanItem[];
    }>({
      url: ApiUrl.planIndex,
      method: 'GET',
    });
    if (hasError || !result) {
      return;
    }
    this.planOperators.setPlans(result.plans);
  };
  public getPlanAsync: (
    id: string,
  ) => Promise<PlanEditModel | undefined> = async id => {
    const { result } = await this.fetchService.fetchWithCredentialAsync<
      PlanEditModel
    >({
      url: ApiUrl.planEdit(id),
      method: 'GET',
    });
    return result;
  };
}
