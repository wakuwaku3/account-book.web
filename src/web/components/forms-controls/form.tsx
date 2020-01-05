import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createStyles } from '@material-ui/core';
import * as React from 'react';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { FormProps } from '../types';

const styles = createStyles({
  form: {
    width: '100%',
  },
});
export interface Props {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}
export const Form = decorate(styles)<Props & FormProps>(props => {
  const { onSubmit, classes, ...others } = createPropagationProps(props);
  const { form } = classes;
  const onSubmitInner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
    return false;
  };
  return (
    <form
      {...others}
      className={form}
      onSubmit={onSubmitInner}
      noValidate={true}
    />
  );
});
