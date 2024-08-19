import { useState, useCallback } from 'react';
import { Photo } from '../interfaces/Photo';
import { FilterParams } from '../interfaces/FilterParams';
import { getPhotos } from '../services/api';

interface UsePhotosReturn {
  photos: Photo[] | null;
  loading: boolean;
  error: string | null;
  fetchPhotos: (filters?: FilterParams) => void;
}

export const usePhotos = (): UsePhotosReturn => {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = useCallback(async (filters?: FilterParams) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPhotos = await getPhotos(filters);
      setPhotos(fetchedPhotos);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error fetching photos: ${err.message}`);
      } else {
        setError('Error fetching photos: An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { photos, loading, error, fetchPhotos };
};
