import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

jest.mock('../styles/Pagination.css', () => ({}));

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Previous and Next buttons', () => {
    render(
      <Pagination currentPage={0} totalPages={5} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should display current page info', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
  });

  it('should disable Previous button on first page', () => {
    render(
      <Pagination currentPage={0} totalPages={5} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('should disable Next button on last page', () => {
    render(
      <Pagination currentPage={4} totalPages={5} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('should call onPageChange with previous page on Previous click', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByText('Previous'));

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('should call onPageChange with next page on Next click', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByText('Next'));

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('should render page number buttons', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
    );

    // Pages around current (0-indexed 2 means page 3), so window [0..4]
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onPageChange when a page number is clicked', () => {
    render(
      <Pagination currentPage={0} totalPages={5} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByText('3'));

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('should highlight the active page', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={mockOnPageChange} />
    );

    const activeButton = screen.getByText('3');
    expect(activeButton).toHaveClass('active');
  });

  it('should show First button and dots when startPage > 0', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByText('First')).toBeInTheDocument();
  });

  it('should show Last button when endPage < totalPages - 1', () => {
    render(
      <Pagination currentPage={2} totalPages={10} onPageChange={mockOnPageChange} />
    );

    expect(screen.getByText('Last')).toBeInTheDocument();
  });

  it('should call onPageChange(0) when First is clicked', () => {
    render(
      <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByText('First'));

    expect(mockOnPageChange).toHaveBeenCalledWith(0);
  });

  it('should call onPageChange(totalPages-1) when Last is clicked', () => {
    render(
      <Pagination currentPage={2} totalPages={10} onPageChange={mockOnPageChange} />
    );

    fireEvent.click(screen.getByText('Last'));

    expect(mockOnPageChange).toHaveBeenCalledWith(9);
  });
});
