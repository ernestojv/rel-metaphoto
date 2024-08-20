import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Photo } from '../interfaces/Photo';
import { getPhotoById } from '../services/api';
import './PhotoDetail.css';
const PhotoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        if (id) {
          const fetchedPhoto = await getPhotoById(Number(id));
          setPhoto(fetchedPhoto);
        }
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

    fetchPhoto();
  }, [id]);

  if (loading) {
    return <p>Loading photo details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!photo) {
    return <p>No photo found.</p>;
  }

  return (
    <div className='PhotoDetail__main'>

      <div className='PhotoDetail__container'>
        <div className='PhotoDetail__header'>
        <h2>{photo.title}</h2>
        <img src={photo.url} alt={photo.title} />
        </div>
        <div className='PhotoDetail__body'>
          <h3>Details</h3>
          <div className='PhotoDetail__body__section'>
            <div className='PhotoDetail__body__section-item'>
              <p>ID</p>
              <p>{photo.id}</p>
            </div>
            <div className='PhotoDetail__body__section-item'>
              <p>Title</p>
              <p>{photo.title}</p>
            </div>
          </div>
          <div className='PhotoDetail__body__section'>
            <h4>Album</h4>
            <div className='PhotoDetail__body__section-item'>
              <p>ID</p>
              <p>{photo.album.id}</p>
            </div>
            <div className='PhotoDetail__body__section-item'>
              <p>Title</p>
              <p>{photo.album.title}</p>
            </div>
          </div>
          <div className='PhotoDetail__body__section'>
            <h4>User</h4>
            <div className='PhotoDetail__body__section-item'>
              <p>ID</p>
              <p>{photo.album.user.id}</p>
            </div>
            <div className='PhotoDetail__body__section-item'>
              <p>Name</p>
              <p>{photo.album.user.name}</p>
            </div>
            <div className='PhotoDetail__body__section-item'>
              <p>Username</p>
              <p>@{photo.album.user.username}</p>
            </div>
            <div className='PhotoDetail__body__section-item'>
              <p>Email</p>
              <p>{photo.album.user.email}</p>
            </div>
            <div className='PhotoDetail__body__section-item'>
              <p>Phone</p>
              <p>{photo.album.user.phone}</p>
            </div>
            <div className='PhotoDetail__body__section-item'>
              <p>Website</p>
              <p>{photo.album.user.website}</p>
            </div>
            <div className='PhotoDetail__body__section-item'>
              <p>Address</p>
              <p>{photo.album.user.address.street}, {photo.album.user.address.suite}, {photo.album.user.address.city}, 
                {photo.album.user.address.zipcode}.  <strong>Geo:</strong> {photo.album.user.address.geo.lat} {photo.album.user.address.geo.lng}</p>
            </div>
            <div className='PhotoDetail__body__section-item'>
              <p>Company</p>
              <p>{photo.album.user.company.name}, {photo.album.user.company.catchPhrase}, {photo.album.user.company.bs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
