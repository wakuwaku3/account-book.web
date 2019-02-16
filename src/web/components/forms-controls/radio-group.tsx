import * as React from 'react';
import {
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControl,
  createStyles,
} from '@material-ui/core';
import { RadioGroupProps as MuiRadioGroupProps } from '@material-ui/core/RadioGroup';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { RadioProps, Radio } from './radio';

const styles = createStyles({
  root: {
    width: '100%',
  },
  group: { flexDirection: 'row' },
});
interface RadioGroupProps {
  label?: string;
  items?: Array<Partial<RadioProps>>;
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
          items.map(x => (
            <Radio
              key={typeof x.value === 'boolean' ? String(x.value) : x.value}
              {...x}
              disabled={readOnly}
              checked={x.checked}
            />
          ))}
      </MuiRadioGroup>
    </FormControl>
  );
});
