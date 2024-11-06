import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // for assertions like toBeInTheDocument
import FilterPanel from '../components/FilterPanel'; // Update the path based on where the component is located

// Test: Displays filter panel inputs
test('renders filter panel inputs', () => {
  const setCategory = jest.fn();
  const setBrand = jest.fn();
  const setPriceRange = jest.fn();
  const setSortOption = jest.fn();

  render(
    <FilterPanel 
      category="" setCategory={setCategory} 
      brand="" setBrand={setBrand} 
      priceRange={[0, 100]} setPriceRange={setPriceRange} 
      sortOption="" setSortOption={setSortOption} 
    />
  );

  // Check if the filter panel inputs are rendered
  expect(screen.getByPlaceholderText(/Search by category/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search by brand/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Min/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Max/i)).toBeInTheDocument();
  expect(screen.getByRole('combobox')).toBeInTheDocument(); // for the select input
});

// Test: Updates filter values when inputs change
test('updates filter values based on user input', async () => {
  const setCategory = jest.fn();
  const setBrand = jest.fn();
  const setPriceRange = jest.fn();
  const setSortOption = jest.fn();

  render(
    <FilterPanel 
      category="" setCategory={setCategory} 
      brand="" setBrand={setBrand} 
      priceRange={[0, 500]} setPriceRange={setPriceRange} 
      sortOption="" setSortOption={setSortOption} 
    />
  );

  // Simulate user input for category and brand
  fireEvent.change(screen.getByPlaceholderText(/Search by category/i), { target: { value: 'Electronics' } });
  fireEvent.change(screen.getByPlaceholderText(/Search by brand/i), { target: { value: 'Apple' } });

  expect(setCategory).toHaveBeenCalledWith('Electronics');
  expect(setBrand).toHaveBeenCalledWith('Apple');
});

// Test: Updates price range when input changes
test('updates price range when input changes', () => {
  const setPriceRange = jest.fn();

  render(
    <FilterPanel 
      category="" setCategory={() => {}} 
      brand="" setBrand={() => {}} 
      priceRange={[0, 500]} setPriceRange={setPriceRange} 
      sortOption="" setSortOption={() => {}} 
    />
  );

  fireEvent.change(screen.getByPlaceholderText(/Min/i), { target: { value: '100' } });
  fireEvent.change(screen.getByPlaceholderText(/Max/i), { target: { value: '400' } });

  fireEvent.blur(screen.getByPlaceholderText(/Min/i)); // trigger blur to update price range
  fireEvent.blur(screen.getByPlaceholderText(/Max/i)); // trigger blur to update price range

  expect(setPriceRange).toHaveBeenCalledWith([100, 400]);
});

// Test: Updates sort option when it changes
test('updates sort option when selection changes', () => {
  const setSortOption = jest.fn();

  render(
    <FilterPanel 
      category="" setCategory={() => {}} 
      brand="" setBrand={() => {}} 
      priceRange={[0, 500]} setPriceRange={() => {}} 
      sortOption="" setSortOption={setSortOption} 
    />
  );

  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'priceAsc' } });

  expect(setSortOption).toHaveBeenCalledWith('priceAsc');
});
