import { Theme as MuiTheme, colors as MuiColors } from '@material-ui/core';
import { FontWeightProperty } from 'csstype';
import { ThemeOptions as MuiThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { green } from '@material-ui/core/colors';

export const colors = {
  amber: MuiColors.amber,
  blue: MuiColors.blue,
  blueGrey: MuiColors.blueGrey,
  brown: MuiColors.brown,
  cyan: MuiColors.cyan,
  deepOrange: MuiColors.deepOrange,
  deepPurple: MuiColors.deepPurple,
  green: MuiColors.green,
  grey: MuiColors.grey,
  indigo: MuiColors.indigo,
  lightBlue: MuiColors.lightBlue,
  lightGreen: MuiColors.lightGreen,
  lime: MuiColors.lime,
  orange: MuiColors.orange,
  pink: MuiColors.pink,
  purple: MuiColors.purple,
  red: MuiColors.red,
  teal: MuiColors.teal,
  yellow: MuiColors.yellow,
};
export type Colors = typeof colors;

export class CommonColors {
  private static common = MuiColors.common;
  public static white = CommonColors.common.white;
  public static black = CommonColors.common.black;
}

const { grey, indigo, yellow, red, blueGrey, pink } = colors;
const isLight = true;
export const primaryColor: keyof typeof colors = 'blue';
const primary = colors[primaryColor];
const secondary = pink;
const type = isLight ? 'light' : 'dark';
const muiThemeOption: MuiThemeOptions = {
  palette: { primary, secondary, type, background: { default: '#fff' } },
  typography: {
    useNextVariants: true,
  },
};
const customThemeOption = {
  typography: {
    useNextVariants: true,
  },
  shared: {
    fontWeight: { bold: 'bold' as FontWeightProperty },
    borderWidth: { thick: 4 },
    table: {
      headerBackgroundColor: isLight ? primary['900'] : primary['50'],
      borderColor: isLight ? primary['400'] : primary['500'],
      headerColor: isLight ? CommonColors.white : CommonColors.black,
      oddBackgroundColor: isLight ? primary['200'] : primary['900'],
      hoverBackgroundColor: isLight ? primary['300'] : primary['800'],
      selectedBackgroundColor: isLight ? blueGrey['100'] : blueGrey['700'],
    },
    chart: {
      balanceColor: isLight ? green['800'] : green['500'],
      incomeColor: isLight ? indigo['700'] : indigo['300'],
      expenseColor: isLight ? red['700'] : red['500'],
      todayColor: isLight ? yellow['800'] : yellow['500'],
      zeroBorderColor: isLight ? red['700'] : red['500'],
      averageBorderColor: isLight ? pink['800'] : pink['500'],
      gridColor: '#ddd',
    },
    messages: {
      info: {
        color: isLight ? indigo['700'] : indigo['300'],
      },
      warning: {
        color: isLight ? yellow['800'] : yellow['500'],
      },
      error: {
        color: isLight ? red['700'] : red['500'],
      },
    },
    labelCard: {
      indigo: {
        color: isLight ? indigo['700'] : indigo['300'],
        borderLeftColor: isLight ? indigo['700'] : indigo['300'],
        backgroundColor: isLight ? indigo['50'] : indigo['900'],
      },
      yellow: {
        color: isLight ? yellow['800'] : yellow['500'],
        borderLeftColor: isLight ? yellow['800'] : yellow['500'],
        backgroundColor: isLight ? yellow['50'] : yellow['900'],
      },
      red: {
        color: isLight ? red['700'] : red['500'],
        borderLeftColor: isLight ? red['700'] : red['500'],
        backgroundColor: isLight ? red['50'] : red['900'],
      },
    },
    drawer: { width: 320 },
    workspaceIcon: {
      image: {
        width: 40,
        height: 40,
      },
      base: {
        width: 52,
        height: 52,
        borderStyle: 'solid',
        borderWidth: 4,
        padding: 2,
        borderRadius: 8,
        borderColor: isLight ? grey['300'] : grey['700'],
        backgroundColor: isLight ? grey['50'] : grey['300'],
      },
      selectedButton: {
        borderColor: isLight ? secondary['500'] : secondary['200'],
        borderWidth: 4,
      },
    },
  },
};
export const defaultThemeOption = {
  ...muiThemeOption,
  ...customThemeOption,
};
export type ThemeOption = typeof defaultThemeOption;

export type Theme = ThemeOption & MuiTheme;
