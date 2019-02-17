import {
  ActualCreationModel,
  ActualEditModel,
} from 'src/domains/models/actual/actual-model';

export interface IActualService {
  addActualAsync: (model: ActualCreationModel) => Promise<boolean>;
  editActualAsync: (id: string, model: ActualEditModel) => Promise<boolean>;
}
