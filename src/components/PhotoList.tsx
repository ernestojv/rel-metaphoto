import React, { useState, useEffect } from 'react';
import { usePhotos } from '../hooks/usePhotos';
import Pagination from './Pagination';
import PhotoFilter from './PhotoFilter';
import { FilterParams } from '../interfaces/FilterParams';

const PhotoList: React.FC = () => {
  const [limit] = useState<number>(10); // Número de fotos por página
  const [offset, setOffset] = useState<number>(0);
  const { photos, loading, error, fetchPhotos } = usePhotos();

  const handleFilterChange = (filters: FilterParams, limit?: number, offset?: number) => {
    fetchPhotos(filters, limit, offset);
  };

  // Fetch initial data
  useEffect(() => {
    fetchPhotos(undefined, limit, offset);
  }, [fetchPhotos, limit, offset]);

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset);
  };

  return (
    <div>
      <PhotoFilter onFilterChange={handleFilterChange} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
          {photos?.map(photo => (
            <li key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </li>
          ))}
        </ul>
      <Pagination limit={limit} offset={offset} onPageChange={handlePageChange} />
    </div>
  );
};

export default PhotoList;

