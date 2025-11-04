import React, { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { IconButton, Modal, Stack, styled } from '@mui/material';
import { Colors } from '../../../constants/color';
import { Button, Text, TextInput } from '../../../components/atom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import TextInputWrapper from '../../../components/molecules/TextInputWrapper';
import Dropdown from '../../../components/molecules/Dropdown';
import { configItem, dropdownJobTypeOptions } from '../constant';
import ConfigFormApply from './ConfigFormApply';
import { useAppDispatch } from '../../../global/redux/store';
import {
  fetchJobList,
  postCreateNewJob,
  resetJobPostingState,
  selectJobPostingState,
} from '../jobPostingSlice';
import { useSelector } from 'react-redux';

interface ModalCreateJobProps {
  open: boolean;
  onClose: () => void;
}

const toggleOptionSchema = z.enum(['mandatory', 'optional', 'off']);

const newJobSchema = z
  .object({
    job_name: z.string().min(1, 'Job Name is required'),
    job_type: z.string().min(1, 'Job Type is required'),
    job_description: z.string().min(1, 'Job Description is required'),
    number_of_candidate: z
      .string()
      .refine((val) => /^\d+$/.test(val) && Number(val) > 0, {
        message: 'At least 1 candidate is required',
      }),
    min_salary: z
      .string()
      .refine(
        (val) =>
          /^\d+$/.test(val.replace(/\./g, '')) &&
          Number(val.replace(/\./g, '')) >= 0,
        {
          message: 'Must be a valid positive number',
        },
      ),
    max_salary: z
      .string()
      .refine(
        (val) =>
          /^\d+$/.test(val.replace(/\./g, '')) &&
          Number(val.replace(/\./g, '')) >= 0,
        {
          message: 'Must be a valid positive number',
        },
      ),

    photo_profile: toggleOptionSchema,
    full_name: toggleOptionSchema,
    date_of_birth: toggleOptionSchema,
    gender: toggleOptionSchema,
    domicile: toggleOptionSchema,
    phone_number: toggleOptionSchema,
    email: toggleOptionSchema,
    linkedin_link: toggleOptionSchema,
  })
  .refine(
    (data) => {
      const min = Number(data.min_salary.replace(/\./g, ''));
      const max = Number(data.max_salary.replace(/\./g, ''));
      return min <= max;
    },
    {
      message: 'Minimum salary cannot be higher than maximum salary',
      path: ['min_salary'],
    },
  )
  .refine(
    (data) => {
      const min = Number(data.min_salary.replace(/\./g, ''));
      const max = Number(data.max_salary.replace(/\./g, ''));
      return max >= min;
    },
    {
      message: 'Maximum salary cannot be lower than minimum salary',
      path: ['max_salary'],
    },
  );

export type NewJobData = z.infer<typeof newJobSchema>;

// Styled components
const Container = styled(Stack)({
  height: '85vh',
  width: 900,
  borderRadius: 10,
  backgroundColor: '#fff',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  outline: 'none',
});

const ModalHeaderContainer = styled(Stack)({
  height: 76,
  padding: '0 24px',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${Colors.neutral[40]}`,
});

const ModalBodyContainer = styled(Stack)({
  height: '100%',
  padding: '16px 24px',
  gap: 16,
  overflowY: 'scroll',
  '&::-webkit-scrollbar': { display: 'none' },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
});

const SalaryContainer = styled(Stack)({
  paddingTop: 24,
  gap: 16,
  borderTop: `1px dashed ${Colors.neutral[40]}`,
});

const ConfigContainer = styled(Stack)({
  padding: 16,
  gap: 16,
  borderRadius: 8,
  border: `1px solid ${Colors.neutral[30]}`,
});

const ModalFooterContainer = styled(Stack)({
  height: 80,
  width: '100%',
  padding: '0 24px',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  borderTop: `1px solid ${Colors.neutral[40]}`,
  placeSelf: 'end',
});

const ModalCreateJob: React.FC<ModalCreateJobProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { loading, successCreate } = useSelector(selectJobPostingState);
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<NewJobData>({
    resolver: zodResolver(newJobSchema),
    defaultValues: {
      job_name: '',
      job_type: dropdownJobTypeOptions[0].value,
      job_description: '',
      number_of_candidate: '1',
      min_salary: '',
      max_salary: '',
      photo_profile: 'mandatory',
      full_name: 'mandatory',
      date_of_birth: 'mandatory',
      gender: 'mandatory',
      domicile: 'mandatory',
      phone_number: 'mandatory',
      email: 'mandatory',
      linkedin_link: 'mandatory',
    },
    mode: 'onChange',
  });

  const numberOfCandidates = watch('number_of_candidate');
  const minSalary = watch('min_salary');
  const maxSalary = watch('max_salary');

  const formatCurrency = (value: string) => {
    const numeric = value.replace(/\D/g, '');
    if (!numeric) return '';
    return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleCurrencyChange = (
    field: 'min_salary' | 'max_salary',
    value: string,
  ) => {
    setValue(field, formatCurrency(value));
  };

  const handleNumberChange = (value: string) => {
    setValue('number_of_candidate', value.replace(/\D/g, ''));
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: NewJobData) => {
    dispatch(postCreateNewJob(data));
  };

  const handleFormSubmit = handleSubmit(onSubmit, (formErrors) => {
    const firstErrorField = Object.keys(formErrors)[0] as keyof NewJobData;
    setFocus(firstErrorField);
  });

  useEffect(() => {
    if (successCreate) {
      handleClose();
      dispatch(resetJobPostingState());
      dispatch(fetchJobList());
    }
  }, [successCreate]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: { sx: { backgroundColor: 'rgba(29,31,32,0.5)' } },
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <Container>
          {/* Header */}
          <ModalHeaderContainer>
            <Text size={16} bold>
              Job Opening
            </Text>
            <IconButton onClick={handleClose} sx={{ p: 0 }}>
              <XMarkIcon
                style={{
                  width: 24,
                  height: 24,
                  color: Colors.neutral[100],
                  strokeWidth: 1.5,
                }}
              />
            </IconButton>
          </ModalHeaderContainer>

          {/* Body */}
          <ModalBodyContainer>
            {/* Job Name */}
            <TextInputWrapper
              label="Job Name"
              required
              bottomDescription={
                errors.job_name && (
                  <Text size={12} color={Colors.danger.main}>
                    {errors.job_name.message}
                  </Text>
                )
              }
            >
              <TextInput
                placeholder="Ex. Front End Engineer"
                {...register('job_name')}
              />
            </TextInputWrapper>

            {/* Job Type */}
            <TextInputWrapper
              label="Job Type"
              required
              bottomDescription={
                errors.job_type && (
                  <Text size={12} color={Colors.danger.main}>
                    {errors.job_type.message}
                  </Text>
                )
              }
            >
              <Controller
                name="job_type"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    options={dropdownJobTypeOptions}
                    value={dropdownJobTypeOptions.find(
                      (o) => o.value === field.value,
                    )}
                    onChange={(option) => field.onChange(option.value)}
                  />
                )}
              />
            </TextInputWrapper>

            {/* Job Description */}
            <TextInputWrapper
              label="Job Description"
              required
              bottomDescription={
                errors.job_description && (
                  <Text size={12} color={Colors.danger.main}>
                    {errors.job_description.message}
                  </Text>
                )
              }
            >
              <TextInput
                placeholder="Ex. Description"
                multiline
                rows={4}
                {...register('job_description')}
              />
            </TextInputWrapper>

            {/* Number of Candidates */}
            <TextInputWrapper
              label="Number of Candidate Needed"
              bottomDescription={
                errors.number_of_candidate && (
                  <Text size={12} color={Colors.danger.main}>
                    {errors.number_of_candidate.message}
                  </Text>
                )
              }
            >
              <TextInput
                type="text"
                placeholder="1"
                {...register('number_of_candidate')}
                value={numberOfCandidates}
                onChange={(e) => handleNumberChange(e.target.value)}
              />
            </TextInputWrapper>

            {/* Salary */}
            <SalaryContainer>
              <Text size={12} color={Colors.neutral[90]}>
                Job Salary
              </Text>
              <Stack
                sx={{ flexDirection: 'row', gap: '16px', alignItems: 'start' }}
              >
                <TextInputWrapper
                  label="Minimum Estimated Salary"
                  containerStyle={{ width: '50%' }}
                  bottomDescription={
                    errors.min_salary && (
                      <Text size={12} color={Colors.danger.main}>
                        {errors.min_salary.message}
                      </Text>
                    )
                  }
                >
                  <TextInput
                    type="text"
                    placeholder="100.000"
                    {...register('min_salary')}
                    value={minSalary}
                    onChange={(e) =>
                      handleCurrencyChange('min_salary', e.target.value)
                    }
                    startAdornment={
                      <Text size={14} bold sx={{ pr: '4px' }}>
                        Rp
                      </Text>
                    }
                  />
                </TextInputWrapper>

                <Stack
                  sx={{
                    width: '16px',
                    height: '1px',
                    backgroundColor: Colors.neutral[40],
                    marginBottom:
                      errors.max_salary?.message || errors.min_salary?.message
                        ? '48px'
                        : '20px',
                    placeSelf: 'end',
                  }}
                />

                <TextInputWrapper
                  label="Maximum Estimated Salary"
                  containerStyle={{ width: '50%' }}
                  bottomDescription={
                    errors.max_salary && (
                      <Text size={12} color={Colors.danger.main}>
                        {errors.max_salary.message}
                      </Text>
                    )
                  }
                >
                  <TextInput
                    type="text"
                    placeholder="200.000"
                    {...register('max_salary')}
                    value={maxSalary}
                    onChange={(e) =>
                      handleCurrencyChange('max_salary', e.target.value)
                    }
                    startAdornment={
                      <Text size={14} bold sx={{ pr: '4px' }}>
                        Rp
                      </Text>
                    }
                  />
                </TextInputWrapper>
              </Stack>
            </SalaryContainer>

            {/* Config Form */}
            <ConfigContainer>
              <Text size={14} bold>
                Minimum Profile Information Required
              </Text>
              <Stack sx={{ p: '8px', gap: '4px' }}>
                {configItem.map((item) => (
                  <Controller
                    key={item.key}
                    control={control}
                    name={item.key as keyof NewJobData}
                    render={({ field }) => (
                      <ConfigFormApply
                        title={item.title}
                        value={field.value as 'mandatory' | 'optional' | 'off'}
                        onChange={(val) => field.onChange(val)}
                        disabled={item.disabled}
                      />
                    )}
                  />
                ))}
              </Stack>
            </ConfigContainer>
          </ModalBodyContainer>

          {/* Footer */}
          <ModalFooterContainer>
            <Button
              onClick={handleFormSubmit}
              sizeVariant="medium"
              colorVariant="primary"
              sx={{ width: 'auto' }}
              loading={loading}
            >
              <Text size={14}>Publish Job</Text>
            </Button>
          </ModalFooterContainer>
        </Container>
      </Stack>
    </Modal>
  );
};

export default ModalCreateJob;
