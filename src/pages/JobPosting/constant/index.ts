export type ConfigItem = {
  title: string;
  key:
    | 'full_name'
    | 'photo_profile'
    | 'gender'
    | 'domicile'
    | 'email'
    | 'phone_number'
    | 'linkedin_link'
    | 'date_of_birth';
  disabled: number[];
};

export const dropdownJobTypeOptions = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Internship', value: 'internship' },
  { label: 'Freelance', value: 'freelance' },
];

export const configItem: ConfigItem[] = [
  {
    title: 'Full name',
    key: 'full_name',
    disabled: [1, 2],
  },
  {
    title: 'Photo profile',
    key: 'photo_profile',
    disabled: [1, 2],
  },
  {
    title: 'Gender',
    key: 'gender',
    disabled: [],
  },
  {
    title: 'Domicile',
    key: 'domicile',
    disabled: [],
  },
  {
    title: 'Email',
    key: 'email',
    disabled: [1, 2],
  },
  {
    title: 'Phone number',
    key: 'phone_number',
    disabled: [],
  },
  {
    title: 'Linkedin link',
    key: 'linkedin_link',
    disabled: [],
  },
  {
    title: 'Date of birth',
    key: 'date_of_birth',
    disabled: [1, 2],
  },
];
