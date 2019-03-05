import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles, Typography } from '@material-ui/core';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { LabelCard } from 'src/web/components/layout/label-card';
import { Localizer } from 'src/domains/common/location/localizer';

const styles = createStyles({
  root: {
    minWidth: 150,
    padding: 5,
    marginRight: 10,
    marginBottom: 10,
    '&:last-child': {
      marginRight: 0,
    },
  },
});
interface Props {
  name: string;
  isIncome: boolean;
  amount: number;
  localizer: Localizer;
}
const Inner: StyledSFC<typeof styles, Props> = props => {
  const { localizer, classes, name, isIncome, amount } = createPropagationProps(
    props,
  );
  const { root } = classes;
  const color =
    amount === 0 ? 'yellow' : isIncome && amount > 0 ? 'indigo' : 'red';
  return (
    <LabelCard color={color} className={root}>
      <Typography variant="subtitle1">{name}</Typography>
      <Typography variant="body2" align="right" color="inherit">
        {localizer.formatMoney(amount)}
      </Typography>
    </LabelCard>
  );
};
export const Amount = decorate(styles)(Inner);
