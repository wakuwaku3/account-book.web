import { injectable } from 'inversify';
import { IValidateService } from './interfaces/validate-service';
import {
  emailRegex,
  passwordRegex,
} from 'src/infrastructures/validation/regex';

@injectable()
export class ValidateService implements IValidateService {
  public isRequired = (value: any) => {
    return Boolean(value);
  };
  public validateEmailFormat = (email: string) => {
    return (
      this.isRequired(email) && emailRegex.test(String(email).toLowerCase())
    );
  };
  public validatePasswordFormat = (password: string) => {
    return this.isRequired(password) && passwordRegex.test(password);
  };
}
