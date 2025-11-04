import React from 'react';
import { IconButton, Modal, Stack, styled } from '@mui/material';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Colors } from '../../../constants/color';
import { Button, Text, TextInput } from '../../../components/atom';
import TextInputWrapper from '../../../components/molecules/TextInputWrapper';
import { selectJobListState } from '../jobListSlice';
import RadioButton from '../../../components/atom/RadioButton';

// --- Styled Components ---
const Container = styled('form')({
  height: '85vh',
  width: 700,
  borderRadius: 10,
  backgroundColor: '#fff',
  boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  outline: 'none',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
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
  flex: 1,
  padding: '16px 24px 120px',
  gap: 16,
  overflowY: 'auto',
  '&::-webkit-scrollbar': { display: 'none' },
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
});

const ButtonContainer = styled(Stack)({
  height: 88,
  padding: '24px 40px',
  position: 'absolute',
  bottom: 0,
  backgroundColor: Colors.neutral[10],
  width: '100%',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  borderTop: `1px solid ${Colors.neutral[40]}`,
  justifyContent: 'center',
  alignItems: 'flex-end',
});

// --- Types ---
type ValidationType = 'mandatory' | 'optional' | 'off';
type FieldKey =
  | 'full_name'
  | 'photo_profile'
  | 'gender'
  | 'domicile'
  | 'email'
  | 'phone_number'
  | 'linkedin_link'
  | 'date_of_birth';

interface Field {
  key: FieldKey;
  validation: { required: ValidationType };
}

const createDynamicSchema = (fields: Field[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach(({ key, validation }) => {
    const isMandatory = validation.required === 'mandatory';
    const isOff = validation.required === 'off';
    if (isOff) return;

    let validator: z.ZodTypeAny;

    switch (key) {
      case 'email':
        validator = z.string().email('Please enter a valid email address');
        break;
      case 'phone_number':
        validator = z
          .string()
          .regex(/^[0-9]{9,15}$/, 'Please enter a valid phone number');
        break;
      case 'date_of_birth':
        validator = z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD')
          .refine((value) => new Date(value) < new Date(), {
            message: 'Date of birth must be before today',
          });
        break;
      case 'photo_profile':
        validator = isMandatory
          ? z
              .any()
              .refine((file) => file instanceof FileList && file.length > 0, {
                message: 'Photo is required',
              })
          : z.any().optional();
        break;
      case 'gender':
        validator = z
          .enum(['male', 'female'])
          .optional()
          .refine((val) => val !== undefined, {
            message: 'Gender is required.',
          });
        break;
      default:
        validator = z.string();
    }

    if (!isMandatory) validator = validator.optional();
    else if (validator instanceof z.ZodString)
      validator = validator.min(1, `${key.replace(/_/g, ' ')} is required`);

    shape[key] = validator;
  });

  return z.object(shape);
};

interface ModalApplyJobProps {
  open: boolean;
  onClose: () => void;
}

const ModalApplyJob: React.FC<ModalApplyJobProps> = ({ open, onClose }) => {
  const { selectedJob } = useSelector(selectJobListState);

  const fields = React.useMemo(() => selectedJob?.fields ?? [], [selectedJob]);
  const schema = React.useMemo(() => createDynamicSchema(fields), [fields]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: any) => {
    console.log('✅ Submitted Data:', data);
  };

  if (!selectedJob) {
    return null;
  }

  return (
    <Modal
      key={selectedJob.jobName}
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
        <Container onSubmit={handleSubmit(onSubmit)}>
          <ModalHeaderContainer>
            <Text size={16} bold>
              Apply for {selectedJob.jobName}
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

          <ModalBodyContainer>
            {fields.map((field) => {
              const { key, validation } = field;
              const required = validation.required === 'mandatory';
              const hidden = validation.required === 'off';

              const commonRegister = register(key);

              if (hidden) {
                return <input type="hidden" key={key} {...commonRegister} />;
              }

              switch (key) {
                case 'photo_profile':
                  return (
                    <TextInputWrapper
                      key={key}
                      label="Photo Profile"
                      required={required}
                    >
                      <TextInput type="file" {...commonRegister} />
                      {errors[key] && (
                        <Text size={12} color={Colors.danger.main}>
                          {(errors[key]?.message as string) ||
                            'This field is required'}
                        </Text>
                      )}
                    </TextInputWrapper>
                  );

                case 'gender':
                  return (
                    <TextInputWrapper
                      key={key}
                      label="Gender"
                      required={required}
                    >
                      <Stack direction="row" gap={2}>
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <RadioButton value="female" {...register(key)} />
                          <Text size={14}>She/her (Female)</Text>
                        </label>
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          <RadioButton value="male" {...register(key)} />
                          <Text size={14}>He/him (Male)</Text>
                        </label>
                      </Stack>
                      {errors[key] && (
                        <Text size={12} color={Colors.danger.main}>
                          {(errors[key]?.message as string) ||
                            'This field is required'}
                        </Text>
                      )}
                    </TextInputWrapper>
                  );

                case 'date_of_birth':
                  return (
                    <TextInputWrapper
                      key={key}
                      label="Date of Birth"
                      required={required}
                    >
                      <TextInput type="date" {...commonRegister} />
                      {errors[key] && (
                        <Text size={12} color={Colors.danger.main}>
                          {(errors[key]?.message as string) ||
                            'This field is required'}
                        </Text>
                      )}
                    </TextInputWrapper>
                  );

                default:
                  return (
                    <TextInputWrapper
                      key={key}
                      label={key.replace(/_/g, ' ')}
                      required={required}
                    >
                      <TextInput
                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                        {...commonRegister}
                      />
                      {errors[key] && (
                        <Text size={12} color={Colors.danger.main}>
                          {(errors[key]?.message as string) ||
                            'This field is required'}
                        </Text>
                      )}
                    </TextInputWrapper>
                  );
              }
            })}
          </ModalBodyContainer>

          <ButtonContainer>
            <Button type="submit" sizeVariant="large">
              Submit Application
            </Button>
          </ButtonContainer>
        </Container>
      </Stack>
    </Modal>
  );
};

export default ModalApplyJob;
