import * as React from 'react';
import * as enzyme from 'enzyme';
import { TextBox } from 'src/web/components/forms-controls/text-box';

it('TextBox.text', () => {
  const textBox = enzyme.shallow(<TextBox value="test" />);
  const actual = textBox.props().value;
  expect(actual).toEqual('test');
});
