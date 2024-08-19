import React, { useState } from 'react';
import { FilterParams } from '../interfaces/FilterParams';

interface PhotoFilterProps {
  onFilterChange: (filters: FilterParams, limit?: number, offset?: number) => void;
}

const PhotoFilter: React.FC<PhotoFilterProps> = ({ onFilterChange }) => {
  const [title, setTitle] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const handleFilterChange = () => {
    const filters: FilterParams = {};
    if (title) filters.title = title;
    if (albumTitle) filters['albumTitle'] = albumTitle;
    if (userEmail) filters['userEmail'] = userEmail;

    onFilterChange(filters, limit, offset);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Photo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Album Title"
        value={albumTitle}
        onChange={(e) => setAlbumTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="User Email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Limit"
        value={limit}
        onChange={(e) => setLimit(parseInt(e.target.value) || 10)}
      />
      <input
        type="number"
        placeholder="Offset"
        value={offset}
        onChange={(e) => setOffset(parseInt(e.target.value) || 0)}
      />
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default PhotoFilter;
