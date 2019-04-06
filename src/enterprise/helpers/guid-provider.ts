import { injectable } from 'inversify';
import { IGuidProvider } from 'src/enterprise/interfaces/helpers/guid-provider';
import { Guid } from 'src/enterprise/interfaces/helpers/guid';

@injectable()
export class GuidProvider implements IGuidProvider {
  public newGuid = () => Guid.newGuid();
}
