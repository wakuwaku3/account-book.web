import * as React from 'react';
import { StyledComponentBase } from 'src/infrastructures/styles/types';
import { createStyles, Collapse, Button } from '@material-ui/core';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { Colors } from 'src/infrastructures/styles/theme';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { ThemeColorScope } from '../styles/theme-color-scope';

const styles = createStyles({
  root: {},
  btn: {},
});
interface Props {
  show?: boolean;
  subject: string;
  themeColor?: keyof Colors;
  onChange?: (show: boolean) => void;
}
interface State {
  show?: boolean;
}
class Inner extends StyledComponentBase<typeof styles, Props, State> {
  constructor(props: any) {
    super(props);
    const { show } = this.props;
    this.state = { show };
  }
  private handleCheck = () => {
    const { onChange } = this.props;
    const { show } = this.state;
    if (onChange) {
      onChange(!show);
    }
    this.setState({ show: !show });
  };
  public render() {
    const { classes, children, subject, themeColor } = createPropagationProps(
      this.props,
    );
    const { show } = this.state;
    const { btn, root } = classes;
    return (
      <ThemeColorScope themeColor={themeColor}>
        <div className={root}>
          <Button
            className={btn}
            onClick={this.handleCheck}
            color="primary"
            variant="contained"
          >
            {subject}
          </Button>
          <Collapse in={show}>{children}</Collapse>
        </div>
      </ThemeColorScope>
    );
  }
}
export const Accordion = decorate(styles)(Inner);
