import { Stack, styled } from '@mui/material';
import Text from '../../atom/Text';
import { Colors } from '../../../constants/color';

const Container = styled(Stack)({
  flexDirection: 'row',
  height: 18,
  gap: 12,
  alignItems: 'center',
  paddingLeft: 1,
  paddingRight: 1,
});

const Line = styled(Stack)({
  backgroundColor: Colors.neutral[60],
  height: 1,
  flex: 1,
});

const Divider = () => (
  <Container>
    <Line />
    <Text size={12} color={Colors.neutral[60]}>
      or
    </Text>
    <Line />
  </Container>
);

export default Divider;
