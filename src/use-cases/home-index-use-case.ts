import { injectable } from 'inversify';
import { IHomeIndexUseCase } from './interfaces/home-index-use-case';
import { inject } from 'src/infrastructures/services/inversify-helper';
import { symbols } from './common/di-symbols';
import { IHomeIndexOperators } from 'src/infrastructures/stores/home-index/operators-interface';

@injectable()
export class HomeIndexUseCase implements IHomeIndexUseCase {
  constructor(
    @inject(symbols.homeIndexOperators)
    private homeIndexOperators: IHomeIndexOperators,
  ) {}
  public setShowState = this.homeIndexOperators.setShowState;
}
