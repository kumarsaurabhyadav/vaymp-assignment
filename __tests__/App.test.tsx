/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../src/services/api', () => ({
  getProducts: jest.fn(() => Promise.resolve([])),
}));

const { getProducts } = require('../src/services/api');
const App = require('../App').default;

test('renders correctly', async () => {
  (getProducts as jest.Mock).mockResolvedValue([]);

  let tree;

  await ReactTestRenderer.act(async () => {
    tree = ReactTestRenderer.create(<App />);
    await Promise.resolve();
  });

  expect(tree).toBeTruthy();
});
