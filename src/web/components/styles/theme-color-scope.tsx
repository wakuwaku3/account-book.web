import { createMuiTheme, colors, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { Colors, defaultThemeOption } from 'src/infrastructures/styles/theme';
import { decorate } from 'src/infrastructures/styles/styles-helper';

interface ThemeColorScopeProps {
  themeColor?: keyof Colors;
}

export const ThemeColorScope = decorate({})<ThemeColorScopeProps>(props => {
  const { themeColor, children, theme } = props;
  if (!themeColor) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  const option = theme
    ? {
        ...theme,
        palette: {
          ...theme.palette,
          primary: themeColor ? colors[themeColor] : undefined,
        },
      }
    : {
        ...defaultThemeOption,
        palette: {
          primary: themeColor ? colors[themeColor] : undefined,
        },
      };
  const newTheme = createMuiTheme(option);
  return <MuiThemeProvider theme={newTheme}>{children}</MuiThemeProvider>;
});
