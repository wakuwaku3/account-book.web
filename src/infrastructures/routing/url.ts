import { format, parse } from 'url';
import * as urljoin from 'url-join';
import { config } from 'src/domains/common/config';

export namespace Url {
  export const root = '/';
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
}
