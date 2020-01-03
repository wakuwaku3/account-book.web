export class Lazy<T> {
  private cache: T | null = null;
  constructor(private factory: () => T) {}
  public get value() {
    if (this.cache === null) {
      this.cache = this.factory();
    }
    return this.cache;
  }
}
