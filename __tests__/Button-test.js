/**
 * @format
 */

import 'react-native';
import React from 'react';
import Button from '../src/components/button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
});

// it('should render button', () => {
//     let tree = renderer.create(<Button />).toJSON();
//
//     expect(global.utils.findById(tree, 'btn')).toBeDefined()
// });