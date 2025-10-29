// src/components/ModalCreateJob.tsx
import React from 'react';
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

interface ModalCreateJobProps {
  open: boolean;
  onClose: () => void;
}

const toggleOptionSchema = z.enum(['mandatory', 'optional', 'off']);

const newJobSchema = z.object({
  fullName: toggleOptionSchema,
  profilePicture: toggleOptionSchema,
  gender: toggleOptionSchema,
  domicile: toggleOptionSchema,
  email: toggleOptionSchema,
  phoneNumber: toggleOptionSchema,
  linkedinLink: toggleOptionSchema,
  dob: toggleOptionSchema,
});

type NewJobData = z.infer<typeof newJobSchema>;

const Container = styled(Stack)({
  height: '85vh',
  width: 900,
  borderRadius: 10,
  backgroundColor: '#fff',
  boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
  outline: 'none',
});

const ModalHeaderContainer = styled(Stack)({
  height: 76,
  paddingLeft: 24,
  paddingRight: 24,
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
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
});

const SalaryContainer = styled(Stack)({
  height: 128,
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
  paddingLeft: 24,
  paddingRight: 24,
  flexDirection: 'row-reverse',
  alignItems: 'center',
  borderTop: `1px solid ${Colors.neutral[40]}`,
  placeSelf: 'end',
});

const ModalCreateJob: React.FC<ModalCreateJobProps> = ({ open, onClose }) => {
  const { control, handleSubmit } = useForm<NewJobData>({
    resolver: zodResolver(newJobSchema),
    defaultValues: {
      fullName: 'mandatory',
      profilePicture: 'mandatory',
      gender: 'mandatory',
      domicile: 'mandatory',
      email: 'mandatory',
      phoneNumber: 'mandatory',
      linkedinLink: 'mandatory',
      dob: 'mandatory',
    },
  });

  const onSubmit = (data: NewJobData) => {
    console.log('Submitted Job Config:', data);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(29, 31, 32, 0.5)',
          },
        },
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100vh' }}
      >
        <Container>
          <ModalHeaderContainer>
            <Text size={16} bold>
              Job Opening
            </Text>
            <IconButton
              onClick={onClose}
              sx={{
                margin: 0,
                padding: 0,
              }}
            >
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
          <ModalBodyContainer>
            {/* jobName */}
            <TextInputWrapper label="Job Name" required>
              <TextInput placeholder="Ex. Front End Engineer" />
            </TextInputWrapper>
            {/* jobType */}
            <TextInputWrapper label="Job Type" required>
              <Dropdown options={dropdownJobTypeOptions} />
            </TextInputWrapper>
            {/* jobDescription */}
            <TextInputWrapper label="Job Description" required>
              <TextInput placeholder="Ex." multiline rows={4} />
            </TextInputWrapper>
            {/* candidateCount */}
            <TextInputWrapper label="Number of Candidate Needed">
              <TextInput placeholder="Ex. 2" />
            </TextInputWrapper>
            <SalaryContainer>
              <Text size={12} color={Colors.neutral[90]}>
                Job Salary
              </Text>
              <Stack
                sx={{
                  flexDirection: 'row',
                  gap: '16px',
                  alignItems: 'end',
                }}
              >
                <TextInputWrapper
                  label="Number of Candidate Needed"
                  containerStyle={{
                    flexGrow: 1,
                  }}
                >
                  <TextInput placeholder="Ex. 2" />
                </TextInputWrapper>
                <Stack
                  style={{
                    width: 16,
                    height: 1,
                    backgroundColor: Colors.neutral[40],
                    marginBottom: 20,
                  }}
                />
                <TextInputWrapper
                  label="Number of Candidate Needed"
                  containerStyle={{
                    flexGrow: 1,
                  }}
                >
                  <TextInput placeholder="Ex. 2" />
                </TextInputWrapper>
              </Stack>
            </SalaryContainer>
            <ConfigContainer>
              <Text size={14} bold>
                Minimum Profile Information Required
              </Text>
              <Stack
                sx={{
                  padding: '8px',
                  gap: '4px',
                }}
              >
                {configItem.map((item) => (
                  <Controller
                    key={item.key}
                    control={control}
                    name={item.key}
                    render={({ field }) => (
                      <ConfigFormApply
                        title={item.title}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                ))}
              </Stack>
            </ConfigContainer>
          </ModalBodyContainer>
          <ModalFooterContainer>
            <Button
              onClick={handleSubmit(onSubmit)}
              sizeVariant="medium"
              colorVariant="primary"
              sx={{
                width: 'auto',
              }}
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
