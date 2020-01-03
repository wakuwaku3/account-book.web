import { IGuidProvider } from 'src/enterprise/infrastructures-interfaces/guid-provider';
import { Guid } from './guid';

export class GuidProvider implements IGuidProvider {
  public newGuid = () => Guid.newGuid();
}
