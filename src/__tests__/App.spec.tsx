import React from 'react';
import 'react-native';
import { render } from '@testing-library/react-native';
import App from '../../App';

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  const { debug } = render(<App />);
  debug();
});
