import React from 'react';
import './Pagination.css';
interface PaginationProps {
  limit: number;
  offset: number;
  onPageChange: (newOffset: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ limit, offset, onPageChange }) => {
  return (
    <div className='Pagination__main'>
      <div className='Pagination__container'>
      {offset > 0 && (
        <button onClick={() => onPageChange(offset - limit)}>Previous</button>
      )}
      <button onClick={() => onPageChange(offset + limit)}>Next</button>
      </div>
    </div>
    
  );
};

export default Pagination;
