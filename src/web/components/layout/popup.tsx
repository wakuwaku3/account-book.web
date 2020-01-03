import * as React from 'react';
import { createStyles, Popper } from '@material-ui/core';
import { PopperProps } from '@material-ui/core/Popper';
import { StateMapperWithRouter } from 'src/infrastructures/routing/types';
import { StoredState } from 'src/adapter/stores/stored-state';
import { StyledSFC } from 'src/infrastructures/styles/types';
import {
  decorate,
  createPropagationProps,
  appendClassName,
} from 'src/infrastructures/styles/styles-helper';
import { withRouter } from 'src/infrastructures/routing/routing-helper';
import { EventMapper } from 'src/infrastructures/stores/types';
import { RefElement } from '../types';
import { connect } from 'react-redux';

const styles = createStyles({
  popper: {},
});
interface Props {
  anchorEl?: RefElement;
  popperProps: Partial<PopperProps>;
}
interface Param {}
export interface PopupProps {
  anchorEl?: RefElement;
  popperProps?: Partial<PopperProps>;
}
const mapStateToProps: StateMapperWithRouter<
  StoredState,
  Props,
  Param,
  PopupProps
> = ({}, { anchorEl, popperProps }) => {
  return { anchorEl, popperProps: popperProps ? popperProps : {} };
};
interface Events {}
const mapEventToProps: EventMapper<Events, PopupProps> = () => {
  return {};
};
const Inner: StyledSFC<typeof styles, Props & Events> = props => {
  const { popperProps, children, classes } = createPropagationProps(props);
  const [anchorEl1, setAnchorEl1] = React.useState<RefElement>(undefined);
  const { popper } = classes;
  const open1 = Boolean(anchorEl1);
  const appendedPopper = appendClassName(popper, popperProps.className);
  const handleClose = () => {
    setAnchorEl1(undefined);
  };
  React.useEffect(() => {
    const { anchorEl } = props;
    setAnchorEl1(anchorEl);
    return handleClose;
  }, []);

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
