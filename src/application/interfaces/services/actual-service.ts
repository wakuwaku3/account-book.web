import {
  ActualEditModel,
  ActualKey,
} from 'src/domains/models/actual/actual-model';

export interface IActualService {
  editActualAsync: (key: ActualKey, model: ActualEditModel) => Promise<boolean>;
}
