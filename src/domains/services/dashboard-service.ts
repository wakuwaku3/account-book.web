import { IDashboardService } from 'src/use-cases/services/interfaces/dashboard-service';
import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/use-cases/common/di-symbols';
import { IFetchService } from 'src/use-cases/services/interfaces/fetch-service';
import { IDashboardOperators } from 'src/infrastructures/stores/dashboard/operators-interface';
import { IMessagesService } from 'src/use-cases/services/interfaces/messages-service';
import { DashboardModel } from '../models/home/dashboard-model';
import { ApiUrl } from 'src/infrastructures/routing/url';
import { Message } from '../models/common/message';

@injectable()
export class DashboardService implements IDashboardService {
  constructor(
    @inject(symbols.fetchService) private fetchService: IFetchService,
    @inject(symbols.dashboardOperators)
    private dashboardOperators: IDashboardOperators,
    @inject(symbols.messagesService)
    private messagesService: IMessagesService,
  ) {}
  public approveAsync = async (selectedMonth: string) => {
    const { model, errors } = await this.fetchService.fetchAsync<{
      model: DashboardModel;
      errors: string[];
    }>({
      url: ApiUrl.dashboardApprove,
      method: 'POST',
      body: { month: selectedMonth },
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
    this.dashboardOperators.setModel(model);
  };
  public cancelApproveAsync = async (selectedMonth: string) => {
    const { model, errors } = await this.fetchService.fetchAsync<{
      model: DashboardModel;
      errors: string[];
    }>({
      url: ApiUrl.dashboardCancelApprove,
      method: 'POST',
      body: { month: selectedMonth },
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
    this.dashboardOperators.setModel(model);
  };
}
