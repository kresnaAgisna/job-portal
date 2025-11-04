export type FieldKey =
  | 'full_name'
  | 'photo_profile'
  | 'gender'
  | 'domicile'
  | 'email'
  | 'phone_number'
  | 'linkedin_link'
  | 'date_of_birth';

export type Field = {
  key: FieldKey;
  validation: {
    required: 'mandatory' | 'optional' | 'off';
  };
};

export type ApplicationSection = {
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
