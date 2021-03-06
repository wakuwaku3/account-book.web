import * as React from 'react';
import { StyledSFC } from 'src/infrastructures/styles/types';
import { createStyles } from '@material-ui/core';
import { Resources } from 'src/enterprise/models/location/resources';
import { decorate } from 'src/infrastructures/styles/styles-helper';
import { createPropagationProps } from 'src/infrastructures/styles/styles-helper';
import {
  RadioGroup,
  RadioProps,
} from 'src/web/components/forms-controls/radio-group';
import { categoryIds } from 'src/enterprise/models/transaction/category';

const styles = createStyles({
  categorySelector: { paddingTop: 20 },
});
interface Props {
  resources: Resources;
  value: string;
  onChange?: (categoryId: string) => void;
}
const Inner: StyledSFC<typeof styles, Props> = props => {
  const { resources, classes, value, onChange } = createPropagationProps(props);
  const { categorySelector } = classes;
  return (
    <RadioGroup
      className={categorySelector}
      label={resources.category}
      onChange={(event, v) => onChange && onChange(v)}
      required={true}
      items={categoryIds.map<RadioProps>(categoryId => ({
        checked: categoryId === value,
        label: resources.getCategoryName(categoryId),
        value: categoryId,
      }))}
    />
  );
};
export const CategorySelector = decorate(styles)(Inner);
