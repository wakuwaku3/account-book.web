import {
  ActualEditModel,
  ActualKey,
} from 'src/enterprise/actual/actual-model';

export interface IActualService {
  editActualAsync: (key: ActualKey, model: ActualEditModel) => Promise<boolean>;
}
