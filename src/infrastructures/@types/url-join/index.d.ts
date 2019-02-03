declare var urljoin: (...parts: string[]) => string;

declare module 'url-join' {
  export = urljoin;
}
