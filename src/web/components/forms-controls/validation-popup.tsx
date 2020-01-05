import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  Checkbox,
  Paper,
  Typography,
  FormControlLabel,
  createStyles,
} from '@material-ui/core';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { ValidationMessageContent } from 'src/infrastructures/validation/validation-message';
import { Popup, PopupProps } from '../layout/popup';

const styles = createStyles({
  validationPopup: {
    padding: 10,
    maxWidth: 400,
  },
});
interface Props {
  popupProps: PopupProps;
  validationMessages: ValidationMessageContent[];
}
const Inner: StyledSFC<typeof styles, Props> = props => {
  const { classes, validationMessages, popupProps } = createPropagationProps(
    props,
  );
  const { validationPopup } = classes;
  return (
    <Popup {...popupProps}>
      <Paper className={validationPopup}>
        {validationMessages.map(({ text, state }, i) => {
          if (state === 'description') {
            return <Typography key={i}>{text}</Typography>;
          }
          return (
            <div key={i}>
              <FormControlLabel
                control={
                  <Checkbox
                    style={{ padding: '2px 12px' }}
                    checked={state === 'valid'}
                  />
                }
                label={text}
              />
            </div>
          );
        })}
      </Paper>
    </Popup>
  );
};
export const ValidationPopup = decorate(styles)(Inner);
