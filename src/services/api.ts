import { Photo } from '../interfaces/Photo';
import { FilterParams } from '../interfaces/FilterParams';
import { API_BASE_URL } from '../config/config';

// Fetch all photos with optional filters
export const getPhotos = async (filters?: FilterParams): Promise<Photo[]> => {
    let query = `${API_BASE_URL}/photos`;
    const queryParams: string[] = [];

    if (filters?.title) {
        queryParams.push(`title=${encodeURIComponent(filters.title)}`);
    }
    if (filters?.albumTitle) {
        queryParams.push(`album.title=${encodeURIComponent(filters.albumTitle)}`);
    }
    if (filters?.userEmail) {
        queryParams.push(`album.user.email=${encodeURIComponent(filters.userEmail)}`);
    }

    if (queryParams.length > 0) {
        query += `?${queryParams.join('&')}`;
    }

    const response = await fetch(query);
    if (!response.ok) {
        throw new Error('Error fetching photos');
    }
    return response.json();
};

// Fetch a single photo by ID
export const getPhotoById = async (id: number): Promise<Photo> => {
    const response = await fetch(`${API_BASE_URL}/photos/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching photo');
    }
    return response.json();
};
