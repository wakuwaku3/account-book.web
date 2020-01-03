import { format, parse } from 'url';
import urljoin from 'url-join';
import { config } from 'src/infrastructures/env/config';
import { stringify } from 'querystring';
import { ActualKey } from 'src/enterprise/actual/actual-model';

const toUrl = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
export type ActualEnterQueryParameters = Partial<
  Record<keyof ActualKey, string>
>;
export class Url {
  public static root = '/';
  public static serviceAgreement = urljoin(Url.root, 'service-agreement');
  public static signUpRequesting = urljoin(Url.root, 'sign-up');
  public static signUp = urljoin(Url.signUpRequesting, ':signUpToken');
  public static passwordResetRequesting = urljoin(Url.root, 'reset-password');
  public static resetPassword = urljoin(
    Url.passwordResetRequesting,
    ':passwordResetToken',
  );
  public static plan = urljoin(Url.root, 'plan');
  public static planCreate = urljoin(Url.plan, 'create');
  public static planEdit = urljoin(Url.plan, ':id');
  public static getPlanEditUrl = (id: string) => urljoin(Url.plan, id);

  public static transaction = urljoin(Url.root, 'transaction');
  public static transactionCreate = urljoin(Url.transaction, 'create');
  public static transactionEdit = urljoin(Url.transaction, ':id');
  public static getTransactionEditUrl = (id: string) =>
    urljoin(Url.transaction, id);

  private static actual = urljoin(Url.root, 'actual');
  public static actualEnter = Url.actual;
  public static getActualUrl = (p: ActualKey) => {
    const param: ActualEnterQueryParameters = {};
    if (p.actualId) {
      param.actualId = p.actualId;
    }
    if (p.planId) {
      param.planId = p.planId;
    }
    if (p.dashboardId) {
      param.dashboardId = p.dashboardId;
    }
    if (p.month) {
      param.month = toUrl(p.month);
    }
    return `${Url.actual}?${stringify(param)}`;
  };
}
export class ApiUrl {
  private static resolveHostname = (rootUrl: string) => {
    const { hostname, port } = parse(rootUrl);
    if (hostname === 'localhost' && window && window.location) {
      return format({
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port,
      });
    }
    return rootUrl;
  };
  public static mockRoot = ApiUrl.resolveHostname('http://localhost:3001');
  public static root = ApiUrl.resolveHostname(config.apiUrl);
  private static accounts = 'accounts';
  public static accountsRefresh = urljoin(
    ApiUrl.root,
    ApiUrl.accounts,
    'refresh',
  );
  public static accountsSignIn = urljoin(
    ApiUrl.root,
    ApiUrl.accounts,
    'sign-in',
  );
  public static accountsResetPassword = urljoin(
    ApiUrl.root,
    ApiUrl.accounts,
    'reset-password',
  );
  public static accountsPasswordResetRequesting = urljoin(
    ApiUrl.root,
    ApiUrl.accounts,
    'password-reset-requesting',
  );
  public static accountsSignUpRequesting = urljoin(
    ApiUrl.root,
    ApiUrl.accounts,
    'sign-up-requesting',
  );
  public static accountsEmail = (passwordResetToken: string) => {
    return urljoin(
      ApiUrl.root,
      ApiUrl.accounts,
      `reset-password?${stringify({ passwordResetToken })}`,
    );
  };
  public static accountsGetSignUp = (signUpToken: string) => {
    return urljoin(
      ApiUrl.root,
      ApiUrl.accounts,
      `sign-up?${stringify({ signUpToken })}`,
    );
  };
  public static accountsSignUp = urljoin(
    ApiUrl.root,
    ApiUrl.accounts,
    'sign-up',
  );
  private static dashboard = 'dashboard';
  public static dashboardIndex = (month?: Date) => {
    if (month) {
      return urljoin(
        ApiUrl.root,
        `${ApiUrl.dashboard}?${stringify({ month: toUrl(month) })}`,
      );
    }
    return urljoin(ApiUrl.root, ApiUrl.dashboard);
  };
  public static dashboardApprove = (id: string) =>
    urljoin(ApiUrl.root, ApiUrl.dashboard, id);

  private static transactions = 'transactions';
  public static transactionsIndex = (month?: Date) => {
    if (month) {
      return urljoin(
        ApiUrl.root,
        `${ApiUrl.transactions}?${stringify({ month: toUrl(month) })}`,
      );
    }
    return urljoin(ApiUrl.root, ApiUrl.transactions);
  };
  public static transactionsEdit = (id: string) => {
    return urljoin(ApiUrl.root, ApiUrl.transactions, id);
  };
  public static transactionsCreate = urljoin(ApiUrl.root, ApiUrl.transactions);

  private static plans = 'plans';
  public static planIndex = urljoin(ApiUrl.root, ApiUrl.plans);
  public static planEdit = (id: string) => {
    return urljoin(ApiUrl.root, ApiUrl.plans, id);
  };

  private static actual = 'actual';
  public static actualEdit = urljoin(ApiUrl.root, ApiUrl.actual);
  public static getActualUrl = (p: ActualKey) => {
    const param: ActualEnterQueryParameters = {};
    if (p.actualId) {
      param.actualId = p.actualId;
    }
    if (p.planId) {
      param.planId = p.planId;
    }
    if (p.dashboardId) {
      param.dashboardId = p.dashboardId;
    }
    if (p.month) {
      param.month = toUrl(p.month);
    }
    return urljoin(ApiUrl.root, `${ApiUrl.actual}?${stringify(param)}`);
  };
}
