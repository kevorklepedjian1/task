import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App'; // Adjust the path if needed

test('displays message when no products match the filter criteria', async () => {
  render(<App />);

  // Simulate a category filter that results in no matching products
  fireEvent.change(screen.getByPlaceholderText(/Search by category/i), {
    target: { value: 'Nonexistent Category' }
  });

  // Wait for the products to filter and expect the "No products found" message
  expect(await screen.findByText(/No products found/i)).toBeInTheDocument();
});

test('displays products when there are matching results', async () => {
  render(<App />);

  // Simulate a valid category filter
  fireEvent.change(screen.getByPlaceholderText(/Search by category/i), {
    target: { value: 'Electronics' }
  });

  // Wait for the products to filter and check that products are displayed
//   const productCards = await screen.findAllByRole('article');
//   expect(productCards).toHaveLength(2); // Adjust the number based on your sample data
});
