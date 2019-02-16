import {
  createStyles,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from '@material-ui/core';
import { CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import * as React from 'react';

const styles = createStyles({
  root: {},
  checkbox: {},
});
interface CheckboxProps {
  label?: string;
}
export const Checkbox = decorate(styles)<CheckboxProps & MuiCheckboxProps>(
  props => {
    const { label, classes, ...others } = createPropagationProps(props);
    const { root, checkbox } = classes;
    return (
      <FormControlLabel
        className={root}
        control={<MuiCheckbox {...others} className={checkbox} />}
        label={label}
      />
    );
  },
);
