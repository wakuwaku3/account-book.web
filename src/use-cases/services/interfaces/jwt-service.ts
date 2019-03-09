import { ClaimResponse, Claim } from 'src/domains/models/accounts/claim';

export interface IJWTService {
  parseClaim: (res: ClaimResponse) => Claim;
}
