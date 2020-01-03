import { injectable } from 'inversify';
import { IGuidProvider } from 'src/enterprise/infrastructures-interfaces/guid-provider';
import { Guid } from './guid';

@injectable()
export class GuidProvider implements IGuidProvider {
  public newGuid = () => Guid.newGuid();
}
