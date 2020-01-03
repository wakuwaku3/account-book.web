import * as React from 'react';
import { StyleRules } from '@material-ui/core/styles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { Theme } from './theme';

export type StyledComponentType<
  TStyles extends Styles,
  TProps = {}
> = React.ComponentType<InjectableStylesProps<TStyles> & TProps>;
export class StyledComponentBase<
  TStyles extends Styles,
  TProps = {},
  TState = {}
> extends React.Component<WithStyleProps<TStyles, TProps>, TState> {}
export type StyledComponentClass<
  TStyles extends Styles,
  TProps = {},
  TState = {}
> = React.ComponentClass<WithStyleProps<TStyles, TProps>, TState>;
export type StyledSFC<TStyles extends Styles, TProps = {}> = React.SFC<
  WithStyleProps<TStyles, TProps>
>;
export type StyledComponent<TStyles extends Styles, TProps = {}> =
  | StyledComponentClass<TStyles, TProps>
  | StyledSFC<TStyles, TProps>;
export type StyleRulesCallback<ClassKey extends string = string> = (
  theme: Theme,
) => StyleRules<ClassKey>;
export type Classes<TStyles extends Styles> = Partial<
  ClassNameMap<
    TStyles extends string
      ? TStyles
      : TStyles extends StyleRulesCallback<infer K>
      ? K
      : TStyles extends StyleRules<infer L>
      ? L
      : never
  >
>;
export type Styles = string | StyleRules | StyleRulesCallback;
export interface InjectableStylesProps<TStyles extends Styles> {
  theme?: Theme;
  className?: string;
  injectClasses?: Classes<TStyles>;
}
export type WithStyles<
  T extends string | StyleRules | StyleRulesCallback = string,
  IncludeTheme extends boolean | undefined = false
> = (IncludeTheme extends true ? { theme: Theme } : {}) & {
  classes: ClassNameMap<
    T extends string
      ? T
      : T extends StyleRulesCallback<infer K>
      ? K
      : T extends StyleRules<infer K>
      ? K
      : never
  >;
};
export type WithStyleProps<TStyles extends Styles, TProps = {}> = WithStyles<
  TStyles
> &
  InjectableStylesProps<TStyles> &
  TProps &
  React.Props<{}>;
