import { ClaimResponse, Claim } from 'src/enterprise/models/accounts/claim';

export interface IJWTService {
  parseClaim: (res: ClaimResponse) => Claim;
}
