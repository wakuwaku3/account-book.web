import { injectable } from 'inversify';
import { IValidateService } from 'src/application/interfaces/services/validate-service';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[!-~]{1,}$/;

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
