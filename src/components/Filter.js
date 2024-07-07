import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterLaunches } from '../features/launches/launchesSlice';

const Filter = () => {
  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();

  const handleApplyFilters = () => {
    dispatch(filterLaunches({ year, status }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-4">
      <div className="flex items-center mb-4 md:mb-0 md:mr-4">
        <label className="mr-2">Launch Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-3 py-2 border rounded bg-gray-800 text-gray-100 placeholder-gray-400"
        />
      </div>
      <div className="flex items-center mb-4 md:mb-0 md:mr-4">
        <label className="mr-2">Launch Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 border rounded bg-gray-800 text-gray-100"
        >
          <option value="">All</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
      </div>
      <button
        onClick={handleApplyFilters}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
