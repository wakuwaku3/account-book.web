import { ClaimResponse, Claim } from 'src/enterprise/accounts/claim';

export interface IJWTService {
  parseClaim: (res: ClaimResponse) => Claim;
}
