import React from 'react';

interface PaginationProps {
  limit: number;
  offset: number;
  onPageChange: (newOffset: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ limit, offset, onPageChange }) => {
  return (
    <div>
      {offset > 0 && (
        <button onClick={() => onPageChange(offset - limit)}>Previous</button>
      )}
      <button onClick={() => onPageChange(offset + limit)}>Next</button>
    </div>
  );
};

export default Pagination;
