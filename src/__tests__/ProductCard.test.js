import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import '@testing-library/jest-dom'; // for assertions like toBeInTheDocument

const mockProduct = {
  name: 'Product 1',
  category: 'Electronics',
  price: 199.99,
  rating: 4,
  imageUrl: 'https://via.placeholder.com/150',
};

test('renders product details correctly', () => {
  render(<ProductCard product={mockProduct} />);

  // Test that the product name is displayed
  expect(screen.getByText(/Product 1/i)).toBeInTheDocument();

  // Test that the product category is displayed
  expect(screen.getByText(/Electronics/i)).toBeInTheDocument();

  // Test that the product price is displayed correctly
  expect(screen.getByText(/\$199.99/i)).toBeInTheDocument();

  // Test that the product rating is displayed with the star symbol
  expect(screen.getByText(/4 ⭐/i)).toBeInTheDocument();

  // Test that the product image is correctly rendered
  const image = screen.getByAltText(/Product 1/i);
  expect(image).toHaveAttribute('src', 'https://via.placeholder.com/150');
});
