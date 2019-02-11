import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles } from '@material-ui/core';
import { Resources } from 'src/domains/common/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import { RadioGroup } from 'src/web/components/forms-controls/radio-group';
import { categoryIds } from 'src/domains/models/transaction/category';
import { primaryColor } from 'src/infrastructures/styles/theme';

const styles = createStyles({
  root: { paddingTop: 20 },
});
interface Props {
  resources: Resources;
  value: string;
  onChange?: (categoryId: string) => void;
}
const Inner: StyledSFC<typeof styles, Props> = props => {
  const { resources, classes, value, onChange } = createPropagationProps(props);
  const { root } = classes;
  return (
    <RadioGroup
      className={root}
      label={resources.category}
      onChange={(event, v) => onChange && onChange(v)}
      items={categoryIds.map(categoryId => ({
        checked: categoryId === value,
        label: resources.getCategoryName(categoryId),
        value: categoryId,
      }))}
      themeColor={primaryColor}
    />
  );
};
export const CategorySelector = decorate(styles)(Inner);
