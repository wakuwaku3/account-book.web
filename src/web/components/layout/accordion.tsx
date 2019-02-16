import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Collapse, Button } from '@material-ui/core';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { Colors } from 'src/infrastructures/styles/theme';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { ThemeColorScope } from '../styles/theme-color-scope';

const styles = createStyles({
  root: { width: '100%' },
  btn: {},
});
interface Props {
  defaultShow?: boolean;
  subject: string;
  themeColor?: keyof Colors;
  onChange?: (show: boolean) => void;
}
const Inner: StyledSFC<typeof styles, Props> = props => {
  const {
    classes,
    children,
    subject,
    themeColor,
    onChange,
    defaultShow,
  } = createPropagationProps(props);
  const { root, btn } = classes;
  const [show, setShow] = React.useState(defaultShow);
  const handleCheck = () => {
    if (onChange) {
      onChange(!show);
    }
    setShow(!show);
  };
  return (
    <ThemeColorScope themeColor={themeColor}>
      <div className={root}>
        <Button
          className={btn}
          onClick={handleCheck}
          color="primary"
          variant={show ? 'outlined' : 'contained'}
          size="small"
        >
          {subject}
        </Button>
        <Collapse in={show}>{children}</Collapse>
      </div>
    </ThemeColorScope>
  );
};
export const Accordion = decorate(styles)(Inner);
