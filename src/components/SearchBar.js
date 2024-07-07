import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLaunches } from '../features/launches/launchesSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    dispatch(fetchLaunches(e.target.value));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-3 py-2 border rounded bg-gray-800 text-gray-100 placeholder-gray-400"
        placeholder="Search by mission name"
      />
    </div>
  );
};

export default SearchBar;
