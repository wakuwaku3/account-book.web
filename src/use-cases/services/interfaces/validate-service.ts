export interface IValidateService {
  isRequired: (value: any) => boolean;
  validateEmailFormat: (email: string) => boolean;
  validatePasswordFormat: (password: string) => boolean;
}
