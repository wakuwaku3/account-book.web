import { injectable } from 'inversify';
import { ClaimResponse, Claim } from 'src/enterprise/models/accounts/claim';
import { decode } from 'jsonwebtoken';
import { IJWTService } from 'src/enterprise/infrastructures-interfaces/jwt-service';
import { fromUtc } from '../helpers/date-helper';

@injectable()
export class JWTService implements IJWTService {
  public parseClaim = (res: ClaimResponse): Claim => {
    const { payload } = decode(res.token, { complete: true }) as {
      payload: {
        locale: 'ja' | 'en';
        email: string;
        exp: number;
        nbf: number;
        nonce: string;
        name: string;
      };
    };
    return {
      ...res,
      cultureName: payload.locale,
      email: payload.email,
      isInitialized: true,
      tokenExpired: fromUtc(payload.exp),
      userId: payload.nonce,
      userName: payload.name,
      useStartDate: fromUtc(payload.nbf),
    };
  };
}
