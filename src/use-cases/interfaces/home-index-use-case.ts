import { HomeIndexShowState } from 'src/domains/models/home/home-index-show-state';

export interface IHomeIndexUseCase {
  setShowState: (showState: HomeIndexShowState) => void;
}
