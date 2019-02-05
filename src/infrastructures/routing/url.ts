// import { stringify } from 'query-string';
import { format, parse } from 'url';
import * as urljoin from 'url-join';
import { config } from 'src/domains/common/config';

export namespace Url {
  export const root = '/';
  export const passwordResetRequesting = urljoin(root, 'reset-password');
  export const resetPassword = urljoin(
    root,
    'reset-password/:passwordResetToken',
  );
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
}
