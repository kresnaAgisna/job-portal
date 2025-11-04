// jobPostingSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../global/redux/store';
import { NewJobData } from './components/ModalCreateJob';
import { safeParseLocalStorage } from '../../global/helpers/safeParseStorage';
import {
  ApplicationForm,
  Field,
  FieldKey,
} from '../../global/types/applicationType';
import { configItem } from './constant';

interface JobPostingState {
  loading: boolean;
  error?: string;
  successCreate: boolean;
  jobs: ApplicationForm[];
}

const initialState: JobPostingState = {
  loading: false,
  error: undefined,
  successCreate: false,
  jobs: [],
};

export const postCreateNewJob = createAsyncThunk<
  string,
  NewJobData,
  { rejectValue: string }
>('jobPosting/postCreateNewJob', async (jobData, { rejectWithValue }) => {
  try {
    const author = localStorage.getItem('userData');
    if (!author) return rejectWithValue('unauthorized');

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const orderedFields: Field[] = configItem.map((item) => ({
      key: item.key as FieldKey,
      validation: {
        required: jobData[item.key as keyof NewJobData] as
          | 'mandatory'
          | 'optional'
          | 'off',
      },
    }));

    const applicationForm: ApplicationForm = {
      application_form: {
        sections: [
          {
            author,
            createdDate: new Date(),
            jobName: jobData.job_name,
            jobType: jobData.job_type,
            jobDescription: jobData.job_description,
            numberOfCandidates: Number(jobData.number_of_candidate),
            minSalary: Number(jobData.min_salary.replace(/\./g, '')),
            maxSalary: Number(jobData.max_salary.replace(/\./g, '')),
            fields: orderedFields,
          },
        ],
      },
    };

    const existingJobList = safeParseLocalStorage(
      'jobList',
      [] as ApplicationForm[],
    );
    existingJobList.push(applicationForm);
    localStorage.setItem('jobList', JSON.stringify(existingJobList));

    return 'success';
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to create job');
  }
});

export const fetchJobList = createAsyncThunk<
  ApplicationForm[],
  void,
  { rejectValue: string }
>('jobPosting/fetchJobList', async (_, { rejectWithValue }) => {
  try {
    const userData = localStorage.getItem('userData');
    if (!userData) return rejectWithValue('unauthorized');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const allJobs = safeParseLocalStorage('jobList', [] as ApplicationForm[]);
    const filteredJobs = allJobs.filter(
      (job) => job.application_form.sections[0].author === userData,
    );

    return filteredJobs;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Failed to fetch jobs');
  }
});

export const jobPostingSlice = createSlice({
  name: 'jobPosting',
  initialState,
  reducers: {
    resetJobPostingState: (state) => {
      state.loading = false;
      state.error = undefined;
      state.successCreate = false;
      state.jobs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // postCreateNewJob
      .addCase(postCreateNewJob.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.successCreate = false;
      })
      .addCase(postCreateNewJob.fulfilled, (state) => {
        state.loading = false;
        state.successCreate = true;
      })
      .addCase(postCreateNewJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successCreate = false;
      })

      // fetchJobList
      .addCase(fetchJobList.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchJobList.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetJobPostingState } = jobPostingSlice.actions;
export const selectJobPostingState = (state: RootState) => state.jobPosting;
export default jobPostingSlice.reducer;
