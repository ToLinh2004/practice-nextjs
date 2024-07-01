import React from 'react';
import { Pagination } from 'react-bootstrap';

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

function PaginationComponent({ totalPages, currentPage, onPageChange }: PaginationComponentProps) {
  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} onClick={() => onPageChange(number)} active={number === currentPage}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination size='lg'>
      <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
      {items}
      <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
    </Pagination>
  );
}

export default PaginationComponent;
