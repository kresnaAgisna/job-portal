import { Stack, styled } from '@mui/material';
import Logo from './assets/logo.svg?react';
import GoogleLogo from './assets/google-logo.svg?react';
import { Colors } from '../../constants/color';
import Divider from '../../components/molecules/Divider';
import TextInputWrapper from '../../components/molecules/TextInputWrapper';
import { Button, Text, TextInput } from '../../components/atom';

const Container = styled(Stack)({
  width: 500,
  height: 454,
  gap: 24,
});

const CardContainer = styled(Stack)({
  width: 500,
  height: 380,
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
  backgroundColor: Colors.neutral[10],
  gap: 16,
  padding: 40,
});

const Register = () => {
  return (
    <Container>
      <Logo />
      <CardContainer>
        <Stack>
          <Text size={20} bold>
            Bergabung dengan Rakamin
          </Text>
          <Text size={14}>Sudah punya akun? Masuk</Text>
        </Stack>
        <TextInputWrapper label="Alamat email" errorMessage="">
          <TextInput />
        </TextInputWrapper>
        <Button sizeVariant="large" colorVariant="secondary">
          <Text size={16} bold>
            Daftar dengan email
          </Text>
        </Button>
        <Divider />
        <Button
          sizeVariant="large"
          colorVariant="white"
          startIcon={<GoogleLogo />}
        >
          <Text size={16} bold>
            Daftar dengan Google
          </Text>
        </Button>
      </CardContainer>
    </Container>
  );
};

export default Register;
