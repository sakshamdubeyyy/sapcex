import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches } from '../features/launches/launchesSlice';

const LaunchesList = () => {
  const dispatch = useDispatch();
  const launches = useSelector((state) => state.launches.filteredLaunches);
  const status = useSelector((state) => state.launches.status);
  const error = useSelector((state) => state.launches.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLaunches());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = (
      <div className="flex justify-center items-center h-full">
        Loading...
      </div>
    );
  } else if (status === 'succeeded') {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {launches.map((launch) => (
          <div key={launch.flight_number} className="border p-4 rounded shadow bg-gray-800">
            <img src={launch.links.mission_patch} alt={launch.mission_name} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-bold">{launch.mission_name}</h2>
            <p>{new Date(launch.launch_date_local).toLocaleDateString()}</p>
            <p>{launch.rocket.rocket_name}</p>
            <p>{launch.launch_site.site_name}</p>
          </div>
        ))}
      </div>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section className="max-w-5xl mx-auto mt-10">
      {content}
    </section>
  );
};

export default LaunchesList;
