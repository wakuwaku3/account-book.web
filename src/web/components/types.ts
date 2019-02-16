export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export type FormProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;
export type RefElement =
  | null
  | undefined
  | HTMLElement
  | ((element: HTMLElement) => HTMLElement);
