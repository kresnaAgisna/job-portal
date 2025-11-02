import { NewJobData } from '../../pages/JobPosting/components/ModalCreateJob';

type Field = {
  key: keyof NewJobData;
  validation: {
    required: any;
  };
};

type ApplicationSection = {
  author: string;
  createdDate: Date;
  jobName: string;
  jobType: string;
  jobDescription: string;
  numberOfCandidates: number;
  minSalary: number;
  maxSalary: number;
  fields: Field[];
};

export type ApplicationForm = {
  application_form: {
    sections: ApplicationSection[];
  };
};
