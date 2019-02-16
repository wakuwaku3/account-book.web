import {
  ActualModel,
  ActualCreationModel,
  ActualEditModel,
} from 'src/domains/actual/actual-model';

export interface IActualUseCase {
  getActualAsync: (
    id: string,
    month?: string,
  ) => Promise<ActualModel | undefined>;
  addActualAsync: (model: ActualCreationModel) => Promise<boolean>;
  editActualAsync: (id: string, model: ActualEditModel) => Promise<boolean>;
}
