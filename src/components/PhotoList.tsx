import React, { useState, useEffect } from 'react';
import { usePhotos } from '../hooks/usePhotos';
import Pagination from './Pagination';
import PhotoFilter from './PhotoFilter';
import { FilterParams } from '../interfaces/FilterParams';
import './PhotoList.css';

const PhotoList: React.FC = () => {
  const [limit, setLimit] = useState<number>(18);
  const [offset, setOffset] = useState<number>(0);
  const { photos, loading, error, fetchPhotos } = usePhotos();

  const handleFilterChange = (filters: FilterParams, limit?: number, offset?: number) => {
    fetchPhotos(filters, limit, offset);
    setLimit(limit ?? 30);
  };

  // Fetch initial data
  useEffect(() => {
    fetchPhotos(undefined, limit, offset);
  }, [fetchPhotos, limit, offset]);

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset);
  };

  return (
    <div className='photoList__main'>
      <PhotoFilter onFilterChange={handleFilterChange} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <section className='photoList__container'>
        {photos?.map(photo => (
            <div className='photoList__item' key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </div>
          ))}
      </section>
      <Pagination limit={limit} offset={offset} onPageChange={handlePageChange} />
    </div>
  );
};

export default PhotoList;

