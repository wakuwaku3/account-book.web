import * as React from 'react';
import { createStyles, Popper } from '@material-ui/core';
import { PopperProps } from '@material-ui/core/Popper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/enterprise/stores/stored-state';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  decorate,
  createPropagationProps,
  appendClassName,
} from 'src/infrastructures/styles/styles-helper';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { EventMapper } from 'src/infrastructures/stores/types';
import { connect } from 'react-redux';
import { ReferenceObject } from 'popper.js';

const styles = createStyles({
  popper: {},
});
interface Props {
  anchorEl?: ReferenceObject | null;
  popperProps: Partial<PopperProps>;
}
interface Param {}
export interface PopupProps {
  anchorEl?: ReferenceObject | null;
  popperProps?: Partial<PopperProps>;
}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  PopupProps
> = (_, { anchorEl, popperProps }) => {
  return { anchorEl, popperProps: popperProps ? popperProps : {} };
};
interface Events {}
const mapEventToProps: EventMapper<Events, PopupProps> = () => {
  return {};
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { popperProps, children, classes, anchorEl } = createPropagationProps(
    props,
  );
  const [anchorEl1, setAnchorEl1] = React.useState<
    ReferenceObject | undefined | null
  >(null);
  const { popper } = classes;
  const open1 = Boolean(anchorEl1);
  const appendedPopper = appendClassName(popper, popperProps.className);
  const handleClose = React.useCallback(() => {
    setAnchorEl1(null);
  }, []);
  React.useEffect(() => {
    setAnchorEl1(anchorEl);
    return handleClose;
  }, [anchorEl, handleClose]);

  return (
    <Popper
      {...popperProps}
      open={open1}
      className={appendedPopper}
      anchorEl={anchorEl1}
      transition={true}
    >
      {open1 && children}
    </Popper>
  );
};
const StyledInner = decorate(styles)(Inner);
const ConnectedInner = connect(mapStateToProps, mapEventToProps)(StyledInner);
export const Popup = withRouter(ConnectedInner);
