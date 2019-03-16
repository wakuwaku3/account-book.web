import { createStyles } from '@material-ui/core';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import * as React from 'react';
import {
  DatePicker as MuiDatePicker,
  MuiPickersUtilsProvider,
  DatePickerProps as MuiDatePickerProps,
} from 'material-ui-pickers';
import { Localizer } from 'src/domains/common/location/localizer';

const styles = createStyles({
  root: {},
});
export interface DatePickerProps
  extends Pick<
    MuiDatePickerProps,
    Exclude<keyof MuiDatePickerProps, 'onChange' | 'ref'>
  > {
  localizer: Localizer;
  onChange?: (date: string) => void;
}
export const DatePicker = decorate(styles)<DatePickerProps>(props => {
  const {
    classes,
    localizer,
    ref,
    onChange,
    ...others
  } = createPropagationProps(props);
  const { root } = classes;
  const { datePicker } = localizer;
  return (
    <MuiPickersUtilsProvider
      utils={datePicker.localizedUtils}
      locale={datePicker.locale}
    >
      <MuiDatePicker
        {...others}
        className={root}
        keyboard={true}
        format={datePicker.datePlaceholder}
        placeholder={datePicker.datePlaceholder}
        mask={value => (value ? datePicker.mask : [])}
        onChange={date =>
          date && onChange && onChange(new Date(date).toISOString())
        }
        disableOpenOnEnter={true}
        autoOk={true}
      />
    </MuiPickersUtilsProvider>
  );
});
