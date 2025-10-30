import { Stack, styled } from '@mui/material';
import Tag from '../../../components/molecules/Tag';
import { Button, Text } from '../../../components/atom';
import { Colors } from '../../../constants/color';
import { ApplicationForm } from '../types';

const CardContainer = styled(Stack)({
  boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
  borderRadius: 16,
  padding: 24,
  gap: 12,
});

interface JobCardProps {
  job: ApplicationForm;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const section = job.application_form.sections[0];

  return (
    <CardContainer>
      <Stack direction="row" gap="16px">
        <Tag text="Active" />
        <Tag
          text={`started on ${formatDate(section.createdDate)}`}
          variant="date"
        />
      </Stack>
      <Stack>
        <Text size={16} bold>
          {section.jobName}
        </Text>
        <Stack direction="row" justifyContent="space-between" gap="8px">
          <Text size={14} color={Colors.neutral[80]}>
            {`${formatCurrency(section.minSalary)} - ${formatCurrency(section.maxSalary)}`}
          </Text>
          <Button
            sizeVariant="small"
            sx={{
              width: 'fit-content',
            }}
          >
            Manage Job
          </Button>
        </Stack>
      </Stack>
    </CardContainer>
  );
};

export default JobCard;
