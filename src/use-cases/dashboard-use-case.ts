import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { IDashboardOperators } from 'src/infrastructures/stores/dashboard/operators-interface';
import { IFetchService } from './services/interfaces/fetch-service';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { DashboardModel } from 'src/domains/models/home/dashboard-model';
import { IMessagesService } from './services/interfaces/messages-service';
import { Message } from 'src/domains/models/common/message';
import { IDashboardService } from './services/interfaces/dashboard-service';
import { IDashboardUseCase } from './interfaces/dashboard-use-case';

@injectable()
export class DashboardUseCase implements IDashboardUseCase {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.dashboardOperators)
    private dashboardOperators: IDashboardOperators,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
    @inject(symbols.dashboardService)
    private dashboardService: IDashboardService,
  ) {}
  public setShowState = this.dashboardOperators.setShowState;
  public getModelAsync = async (selectedMonth?: Date) => {
    const { model, errors } = await this.fetchService.fetchAsync<{
      model: DashboardModel;
      errors: string[];
    }>({
      url: ApiUrl.dashboardIndex(selectedMonth),
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
    model.selectedMonth = new Date(model.selectedMonth);
    this.dashboardOperators.setModel(model);
  };
  public approveAsync = this.dashboardService.approveAsync;
  public cancelApproveAsync = this.dashboardService.cancelApproveAsync;
}
