import { IAccountsOperators } from './interfaces/account-operators';
import { Claim, ClaimResponse } from 'src/enterprise/models/accounts/claim';
import { IIdentityService } from './interfaces/identity-service';
import { IJWTService } from 'src/enterprise/infrastructures-interfaces/jwt-service';
import { cultureInfos } from 'src/enterprise/models/location/culture-infos';

export class IdentityService implements IIdentityService {
  private claim?: Claim;
  constructor(
    private accountsOperators: IAccountsOperators,
    private jwtService: IJWTService,
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
