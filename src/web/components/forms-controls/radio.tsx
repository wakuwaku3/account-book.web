import {
  createStyles,
  FormControlLabel,
  Radio as MuiRadio,
} from '@material-ui/core';
import { RadioProps as MuiRadioProps } from '@material-ui/core/Radio';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import * as React from 'react';

const styles = createStyles({
  root: {},
  radio: {},
});
export interface RadioProps extends MuiRadioProps {
  label?: string;
}
export const Radio = decorate(styles)<RadioProps>(props => {
  const { label, classes, ...others } = createPropagationProps(props);
  const { root, radio } = classes;
  return (
    <FormControlLabel
      className={root}
      control={<MuiRadio {...others} className={radio} />}
      label={label}
    />
  );
});
