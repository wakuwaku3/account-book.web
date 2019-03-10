import * as React from 'react';
import {
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControl,
  createStyles,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { RadioGroupProps as MuiRadioGroupProps } from '@material-ui/core/RadioGroup';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { RadioProps as MuiRadioProps } from '@material-ui/core/Radio';

const styles = createStyles({
  root: {
    width: '100%',
  },
  group: { flexDirection: 'row' },
});
export interface RadioProps extends Partial<MuiRadioProps> {
  label: string;
}
interface RadioGroupProps {
  label?: string;
  items?: RadioProps[];
  readOnly?: boolean;
}
export const RadioGroup = decorate(styles)<
  RadioGroupProps & MuiRadioGroupProps
>(props => {
  const { label, items, readOnly, classes, ...others } = createPropagationProps(
    props,
  );
  const { root, group } = classes;
  return (
    <FormControl className={root}>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup {...others} className={group}>
        {items &&
          items.map(({ label: itemLabel, value, ...os }) => {
            return (
              <FormControlLabel
                key={String(value)}
                control={<Radio {...os} value={value} />}
                label={itemLabel}
              />
            );
          })}
      </MuiRadioGroup>
    </FormControl>
  );
});
