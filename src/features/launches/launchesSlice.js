import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLaunches = createAsyncThunk('launches/fetchLaunches', async (searchTerm = '') => {
  const response = await fetch(`https://api.spacexdata.com/v3/launches`);
  const data = await response.json();
  if (searchTerm) {
    return data.filter((launch) => launch.mission_name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  return data;
});

export const launchesSlice = createSlice({
  name: 'launches',
  initialState: {
    launches: [],
    status: 'idle',
    error: null,
    filteredLaunches: [],
  },
  reducers: {
    filterLaunches: (state, action) => {
      const { year, status } = action.payload;
      state.filteredLaunches = state.launches.filter((launch) => {
        const matchYear = year ? launch.launch_year === year : true;
        const matchStatus = status
          ? status === 'success'
            ? launch.launch_success
            : !launch.launch_success
          : true;
        return matchYear && matchStatus;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLaunches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.launches = action.payload;
        state.filteredLaunches = action.payload;
      })
      .addCase(fetchLaunches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { filterLaunches } = launchesSlice.actions;

export default launchesSlice.reducer;
