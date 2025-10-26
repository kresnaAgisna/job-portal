import { Stack, styled } from '@mui/material';
import Text from '../../../components/atom/Text';
import Button from '../../../components/atom/Button';
import cardBackground from '../assets/card-background.jpg';
import { Colors } from '../../../constants/color';

const CardContainer = styled(Stack)({
  width: 300,
  borderRadius: 16,
  padding: 24,
  gap: 24,
  backgroundImage: `
    linear-gradient(rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)),
    url(${cardBackground})
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const CreateJobCard = () => {
  return (
    <CardContainer>
      <Stack alignItems="center">
        <Text size={20} color={Colors.neutral[10]}>
          Recruit the best candidates
        </Text>
        <Text size={16} color={Colors.neutral[10]}>
          Create jobs, invite, and hire with ease
        </Text>
      </Stack>
      <Button sizeVariant="large">
        <Text size={16} bold>
          Create a new job
        </Text>
      </Button>
    </CardContainer>
  );
};

export default CreateJobCard;
