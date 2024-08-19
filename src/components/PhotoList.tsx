import React, { useEffect } from 'react';
import { usePhotos } from '../hooks/usePhotos';

const PhotoList: React.FC = () => {
  const { photos, loading, error, fetchPhotos } = usePhotos();

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  if (loading) {
    return <p>Loading photos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Photo List</h1>
      {photos && photos.length > 0 ? (
        <ul>
          {photos.map(photo => (
            <li key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No photos available.</p>
      )}
    </div>
  );
};

export default PhotoList;
