import {
  ActualModel,
  ActualEditModel,
  ActualKey,
} from 'src/domains/models/actual/actual-model';

export interface IActualUseCase {
  getActualAsync: (key: ActualKey) => Promise<ActualModel | undefined>;
  editActualAsync: (key: ActualKey, model: ActualEditModel) => Promise<boolean>;
}
