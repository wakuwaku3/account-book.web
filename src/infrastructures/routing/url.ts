// import { stringify } from 'query-string';
import { format, parse } from 'url';
import * as urljoin from 'url-join';
import { config } from 'src/domains/common/config';

export namespace Url {
  export const root = '/';
  export const passwordResetRequesting = urljoin(root, 'reset-password');
  export const resetPassword = urljoin(
    passwordResetRequesting,
    ':passwordResetToken',
  );
  export const plan = urljoin(root, 'plan');
  export const planCreate = urljoin(plan, 'create');
  export const planEdit = urljoin(plan, ':id');
  export const planEnter = urljoin(planEdit, ':month');
  export const getPlanEnterUrl = (id: string, month: string) =>
    urljoin(plan, id, month);
  export const transaction = urljoin(root, 'transaction');
  export const transactionCreate = urljoin(transaction, 'create');
  export const transactionEdit = urljoin(transaction, ':id');
  export const getTransactionEditUrl = (id: string) => urljoin(transaction, id);
}
export namespace ApiUrl {
  const resolveHostname = (rootUrl: string) => {
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
  export const mockRoot = resolveHostname('http://localhost:3001');
  export const root = resolveHostname(config.apiUrl);
  const accounts = 'accounts';
  export const accountsRefresh = urljoin(mockRoot, accounts, 'refresh');
  export const accountsSignIn = urljoin(mockRoot, accounts, 'sign-in');
  export const accountsResetPassword = urljoin(
    mockRoot,
    accounts,
    'reset-password',
  );
  export const accountsPasswordResetRequesting = urljoin(
    mockRoot,
    accounts,
    'password-rest-requesting',
  );
  export const accountsEmail = (passwordResetToken: string) => {
    return urljoin(mockRoot, accounts, 'email');
    // return urljoin(
    //   mockRoot,
    //   accounts,
    //   `email?${stringify({ passwordResetToken })}`,
    // );
  };
  export const accountsPreviousPassword = urljoin(
    mockRoot,
    accounts,
    'previous-password',
  );
  const dashboard = 'dashboard';
  export const dashboardIndex = (month?: string) => {
    if (month) {
      return urljoin(mockRoot, dashboard, month);
    }
    return urljoin(mockRoot, dashboard);
  };
  export const dashboardApprove = urljoin(mockRoot, dashboard, 'approve');
  export const dashboardCancelApprove = urljoin(
    mockRoot,
    dashboard,
    'cancel-approve',
  );
  const transaction = 'transaction';
  export const transactionIndex = (month?: string) => {
    if (month) {
      return urljoin(mockRoot, transaction, month);
    }
    return urljoin(mockRoot, transaction);
  };
}
