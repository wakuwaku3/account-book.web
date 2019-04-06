import { injectable } from 'inversify';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from 'src/application/use-cases/di/di-symbols';
import { IAccountsOperators } from 'src/infrastructures/stores/accounts/operators-interface';
import { IJWTService } from 'src/application/interfaces/services/jwt-service';
import { IIdentityService } from 'src/application/interfaces/services/identity-service';
import { Claim, ClaimResponse } from 'src/domains/models/accounts/claim';
import { cultureInfos } from 'src/domains/common/location/culture-infos';

@injectable()
export class IdentityService implements IIdentityService {
  private claim?: Claim;
  constructor(
    @inject(symbols.accountsOperators)
    private accountsOperators: IAccountsOperators,
    @inject(symbols.jwtService) private jwtService: IJWTService,
  ) {}

  public signIn = async (result: ClaimResponse) => {
    this.claim = this.jwtService.parseClaim(result);
    this.accountsOperators.signIn({ claim: this.claim });
  };

  public signOut = () => {
    this.claim = undefined;
    this.accountsOperators.signOut({});
  };

  public getClaim = () => this.claim;
  private get cultureName() {
    return this.claim ? this.claim.cultureName : 'ja';
  }
  public getCultureInfo = () => cultureInfos[this.cultureName];
  public getLocalizer = () => this.getCultureInfo().localizer;
  public getMessages = () => this.getCultureInfo().messages;
  public getResources = () => this.getCultureInfo().resources;
}
