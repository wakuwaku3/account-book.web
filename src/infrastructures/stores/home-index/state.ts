import { HomeIndexShowState } from 'src/domains/models/home/home-index-show-state';

export interface HomeIndexState extends HomeIndexShowState {}

export const getDefaultHomeIndexState = () => {
  if (localStorage) {
    const value = localStorage.getItem('home-index');
    if (value) {
      const res = JSON.parse(value) as HomeIndexState;
      if (res) {
        return res;
      }
    }
  }
  return {};
};

export default HomeIndexState;
