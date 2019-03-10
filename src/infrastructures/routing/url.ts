// import { stringify } from 'query-string';
import { format, parse } from 'url';
import * as urljoin from 'url-join';
import { config } from 'src/domains/common/config';
import { stringify } from 'querystring';

const toUrl = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
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
  export const getPlanEditUrl = (id: string) => urljoin(plan, id);

  export const transaction = urljoin(root, 'transaction');
  export const transactionCreate = urljoin(transaction, 'create');
  export const transactionEdit = urljoin(transaction, ':id');
  export const getTransactionEditUrl = (id: string) => urljoin(transaction, id);

  const actual = urljoin(root, 'actual');
  export const actualEdit = urljoin(actual, ':id');
  export const actualCreate = urljoin(actual, ':id', ':month');
  export const getActualUrl = (id: string, month?: Date) =>
    month ? urljoin(actual, id, toUrl(month)) : urljoin(actual, id);
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
  export const accountsRefresh = urljoin(root, accounts, 'refresh');
  export const accountsSignIn = urljoin(root, accounts, 'sign-in');
  export const accountsResetPassword = urljoin(
    root,
    accounts,
    'reset-password',
  );
  export const accountsPasswordResetRequesting = urljoin(
    root,
    accounts,
    'password-reset-requesting',
  );
  export const accountsEmail = (passwordResetToken: string) => {
    return urljoin(
      root,
      accounts,
      `reset-password?${stringify({ passwordResetToken })}`,
    );
  };
  export const accountsPreviousPassword = urljoin(
    mockRoot,
    accounts,
    'check-previous-password',
  );
  const dashboard = 'dashboard';
  export const dashboardIndex = (month?: Date) => {
    if (month) {
      return urljoin(mockRoot, dashboard, toUrl(month));
    }
    return urljoin(mockRoot, dashboard);
  };
  export const dashboardApprove = urljoin(mockRoot, dashboard, 'approve');
  export const dashboardCancelApprove = urljoin(
    mockRoot,
    dashboard,
    'cancel-approve',
  );

  const transactions = 'transactions';
  export const transactionsIndex = (month?: Date) => {
    if (month) {
      return urljoin(
        root,
        `${transactions}?${stringify({ month: toUrl(month) })}`,
      );
    }
    return urljoin(root, transactions);
  };
  export const transactionsEdit = (id: string) => {
    return urljoin(root, transactions, id);
  };
  export const transactionsCreate = urljoin(root, transactions);

  const plan = 'plan';
  export const planIndex = urljoin(mockRoot, plan);
  export const planEdit = (id: string) => {
    return urljoin(mockRoot, plan, id);
  };
  export const planCreate = urljoin(mockRoot, plan, 'create');

  const actual = 'actual';
  export const actualEdit = (id: string, month?: string) => {
    if (month) {
      return urljoin(mockRoot, actual, id, month);
    }
    return urljoin(mockRoot, actual, id);
  };
}
