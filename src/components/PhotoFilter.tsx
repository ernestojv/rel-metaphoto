import React, { useState } from 'react';
import { FilterParams } from '../interfaces/FilterParams';
import './PhotoFilter.css';
interface PhotoFilterProps {
  onFilterChange: (filters: FilterParams, limit?: number, offset?: number) => void;
}

const PhotoFilter: React.FC<PhotoFilterProps> = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [limit, setLimit] = useState(18);

  const handleFilterChange = () => {
    const filters: FilterParams = {};
    if (title) filters.title = title;
    if (albumTitle) filters['albumTitle'] = albumTitle;
    if (userEmail) filters['userEmail'] = userEmail;
    if (limit) filters['limit'] = limit;
    onFilterChange(filters, limit);
  };

  return (
    <div className='photoFilter__main'>
    <div className='photoFilter__container'>
      <h2>Filters</h2>
      <div className='photoFilter__filters'>
        <div className='photoFilter__filters__item'>
          <label htmlFor="title">Photo Title</label>
          <input
            id="title"
            type="text"
            placeholder="Photo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          </div>
        <div className='photoFilter__filters__item'>
          <label htmlFor="albumTitle">Album Title</label>
          <input
            id="albumTitle"
            type="text"
            placeholder="Album Title"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
          />
        </div>
        <div className='photoFilter__filters__item'>
          <label htmlFor="userEmail">User Email</label>
          <input
          type="text"
          placeholder="User Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        </div>
        <div className='photoFilter__filters__item'>
          <label htmlFor="limit">Limit</label>
          <input
          type="number"
          placeholder="Limit"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
        />
        </div>
        
      </div>
      
    </div>
    <div className='photoFilter__buttons'>
      <button className='photoFilter__button' onClick={handleFilterChange}>Apply Filters</button>
    </div>
    
    </div>
    
  );
};

export default PhotoFilter;
