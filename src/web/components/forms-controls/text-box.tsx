import * as React from 'react';
import { TextField, createStyles } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';

const styles = createStyles({
  root: {
    width: '100%',
  },
});
interface Props {
  maxLength?: number;
}
export type TextBoxProps = Props & TextFieldProps;
export const TextBox = decorate(styles)<TextBoxProps>(props => {
  const {
    onChange,
    maxLength,
    classes,
    variant,
    ...others
  } = createPropagationProps(props);
  const { root } = classes;
  return (
    <TextField
      variant="standard"
      {...others}
      className={root}
      onChange={e =>
        onChange
          ? maxLength
            ? e.target.value.length <= maxLength && onChange(e)
            : onChange(e)
          : null
      }
    />
  );
});
TextBox.defaultProps = { type: 'text', variant: 'standard' };
