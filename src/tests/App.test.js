import { render, screen } from '@testing-library/react';
import App from './containers/App';
import Search from './containers/search';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/newest/);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<Search />);
  const linkElement = screen.getByText(/Categories/);
  expect(linkElement).toBeInTheDocument();
});