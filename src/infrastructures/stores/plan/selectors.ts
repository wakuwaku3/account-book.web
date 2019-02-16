import State from './state';

export class PlanSelectors {
  constructor(private state: State) {}
  public get items() {
    return this.state.items ? this.state.items : [];
  }
}
