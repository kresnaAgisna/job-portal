import { MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { Stack, styled } from '@mui/material';
import { Colors } from '../../../constants/color';
import DetaiLogo from '../assets/detail-logo.svg?react';
import { Text } from '../../../components/atom';
import { ApplicationForm } from '../../../global/types/applicationType';
import { formatCurrency } from '../helpers';

interface JobListCardProps {
  active?: boolean;
  onClick?: () => void;
  job: ApplicationForm;
}

const CardContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  marginBottom: 8,
  height: 140,
  padding: '12px 16px',
  border: active
    ? `2px solid ${Colors.primary.hover}`
    : `1px solid ${Colors.neutral[40]}`,
  backgroundColor: active ? Colors.primary.surface : Colors.neutral[10],
  borderRadius: 8,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: Colors.primary.main,
  },
}));

const CardHeaderContainer = styled(Stack)({
  flexDirection: 'row',
  gap: 16,
  height: 60,
  paddingBottom: 8,
  borderBottom: `1px solid ${Colors.neutral[40]}`,
});

const CardBodyContainer = styled(Stack)({
  marginTop: 8,
  gap: 8,
});

const InfoRow = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
});

const Icon = styled('span')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
});

const JobListCard = ({ active = false, onClick, job }: JobListCardProps) => {
  const { jobName, maxSalary, minSalary } = job.application_form.sections[0];
  return (
    <CardContainer active={active} onClick={onClick}>
      <CardHeaderContainer>
        <DetaiLogo />
        <Stack>
          <Text size={14} bold>
            {jobName}
          </Text>
          <Text size={10} color={Colors.neutral[60]}>
            Company Name
          </Text>
        </Stack>
      </CardHeaderContainer>

      <CardBodyContainer>
        <InfoRow>
          <Icon>
            <MapPinIcon width={16} height={16} color={Colors.neutral[80]} />
          </Icon>
          <Text size={12} color={Colors.neutral[80]}>
            Jakarta Selatan
          </Text>
        </InfoRow>

        <InfoRow>
          <Icon>
            <CurrencyDollarIcon
              width={16}
              height={16}
              color={Colors.neutral[80]}
            />
          </Icon>
          <Text size={12} color={Colors.neutral[80]}>
            {`${formatCurrency(minSalary)} - ${formatCurrency(maxSalary)}`}
          </Text>
        </InfoRow>
      </CardBodyContainer>
    </CardContainer>
  );
};

export default JobListCard;
