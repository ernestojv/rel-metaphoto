import { useState, useEffect } from 'react';
import { Photo } from '../interfaces/Photo';
import { FilterParams } from '../interfaces/FilterParams';
import { getPhotos, getPhotoById } from '../services/api';

interface UsePhotoReturn {
    photos: Photo[] | null;
    photo: Photo | null;
    loading: boolean;
    error: string | null;
    fetchPhotos: (filters?: FilterParams) => void;
    fetchPhotoById: (id: number) => void;
}

export const usePhoto = (): UsePhotoReturn => {
    const [photos, setPhotos] = useState<Photo[] | null>(null);
    const [photo, setPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPhotos = async (filters?: FilterParams) => {
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
    };

    const fetchPhotoById = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const fetchedPhoto = await getPhotoById(id);
            setPhoto(fetchedPhoto);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(`Error fetching photo: ${err.message}`);
            } else {
                setError('Error fetching photo: An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhotos();
    }, []);

    return { photos, photo, loading, error, fetchPhotos, fetchPhotoById };
};