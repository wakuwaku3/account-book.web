import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  createStyles,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import { Resources } from 'src/domains/common/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { History } from 'history';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { Localizer } from 'src/domains/common/location/localizer';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { MonthPickerModel } from 'src/domains/models/common/month-picker-model';

const styles = createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  btn: {
    minWidth: 130,
  },
});
interface Props {
  monthPicker?: MonthPickerModel;
  resources: Resources;
  localizer: Localizer;
  history: History;
  onChange: (month?: string) => void;
}
const Inner: StyledSFC<typeof styles, Props> = props => {
  const { localizer, classes, monthPicker, onChange } = createPropagationProps(
    props,
  );
  if (!monthPicker) {
    return null;
  }
  const { selectedMonth, selectableMonths } = monthPicker;
  const month = new Date(selectedMonth);
  const index = selectableMonths.indexOf(selectedMonth);
  const beforeDisabled = index <= 0;
  const nextDisabled = index >= selectableMonths.length - 1;
  const { root, btn } = classes;
  return (
    <div className={root}>
      <IconButton
        disabled={beforeDisabled}
        onClick={() => onChange(selectableMonths[index - 1])}
      >
        <NavigateBefore />
      </IconButton>
      <Button className={btn} onClick={() => onChange()}>
        <Typography variant="h6">{localizer.formatMonth(month)}</Typography>
      </Button>
      <IconButton
        disabled={nextDisabled}
        onClick={() => onChange(selectableMonths[index + 1])}
      >
        <NavigateNext />
      </IconButton>
    </div>
  );
};
export const MonthPicker = decorate(styles)(Inner);
