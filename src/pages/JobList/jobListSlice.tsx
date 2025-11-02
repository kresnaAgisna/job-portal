import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../global/redux/store';
import { safeParseLocalStorage } from '../../global/helpers/safeParseStorage';
import { ApplicationForm } from '../../global/types/applicationType';

interface JobListState {
  loading: boolean;
  error?: string;
  successCreate: boolean;
  jobs: ApplicationForm[];
  selectedJob: ApplicationForm['application_form']['sections'][number] | null;
}

const initialState: JobListState = {
  loading: false,
  error: undefined,
  successCreate: false,
  jobs: [],
  selectedJob: null,
};

export const fetchJobList = createAsyncThunk<
  any[],
  void,
  { rejectValue: string }
>('jobList/fetchJobList', async (_, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const allJobs = safeParseLocalStorage('jobList', [] as any[]);
    return allJobs;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch jobs');
  }
});

export const jobListSlice = createSlice({
  name: 'jobList',
  initialState,
  reducers: {
    resetJobListState: (state) => {
      state.loading = false;
      state.error = undefined;
      state.successCreate = false;
      state.jobs = [];
      state.selectedJob = null;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobList.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchJobList.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
        if (action.payload.length > 0) {
          const firstJob = action.payload[0];
          state.selectedJob = firstJob.application_form.sections[0];
        } else {
          state.selectedJob = null;
        }
      })
      .addCase(fetchJobList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetJobListState, setSelectedJob } = jobListSlice.actions;
export const selectJobListState = (state: RootState) => state.jobList;
export default jobListSlice.reducer;
