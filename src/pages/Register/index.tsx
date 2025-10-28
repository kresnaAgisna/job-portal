import { Stack, styled } from '@mui/material';
import { email, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Logo from './assets/logo.svg?react';
import GoogleLogo from './assets/google-logo.svg?react';
import { Colors } from '../../constants/color';
import Divider from '../../components/molecules/Divider';
import TextInputWrapper from '../../components/molecules/TextInputWrapper';
import { Button, Text, TextInput } from '../../components/atom';
import InputBottomDesc from './components/InputBottomDesc';
import { useAppDispatch } from '../../global/redux/store';
import { useSelector } from 'react-redux';
import {
  postRegisterUser,
  resetRegisterState,
  selectRegisterState,
} from './registerSlice';
import { useNavigate } from 'react-router-dom';
import WarningBar from './components/WarningBar';
import { useEffect } from 'react';

const Container = styled(Stack)({
  width: 500,
  gap: 24,
});

const CardContainer = styled('form')({
  width: 500,
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
  backgroundColor: Colors.neutral[10],
  gap: 16,
  padding: 40,
  display: 'flex',
  flexDirection: 'column',
});

export const registerSchema = z.object({
  email: z.email({ message: 'Alamat email tidak valid' }),
});

export type RegisterData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { errorRegister, loading, successRegister } =
    useSelector(selectRegisterState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterData) => {
    dispatch(postRegisterUser(data.email));
  };

  const onClickRegister = () => {
    const email = emailValue?.trim();
    if (!email) return;

    handleSubmit(onSubmit)();
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  const emailValue = watch('email');

  useEffect(() => {
    dispatch(resetRegisterState());
  }, [emailValue, dispatch]);

  return (
    <Container>
      <Logo />
      <CardContainer>
        <Stack>
          <Text size={20} bold>
            Bergabung dengan Rakamin
          </Text>
          <Text size={14}>
            Sudah punya akun?{' '}
            <Text
              onClick={navigateLogin}
              component="a"
              color={Colors.primary.main}
              size={14}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: Colors.primary.hover,
                },
              }}
            >
              Masuk
            </Text>
          </Text>
        </Stack>
        {errorRegister ? <WarningBar onClick={navigateLogin} /> : null}
        <TextInputWrapper
          label="Alamat email"
          bottomDescription={
            <InputBottomDesc
              errorMessage={errors.email?.message}
              emailValue={emailValue}
              success={successRegister}
            />
          }
        >
          <TextInput placeholder="contoh@email.com" {...register('email')} />
        </TextInputWrapper>

        {successRegister ? (
          <Button sizeVariant="large" onClick={navigateLogin}>
            <Text size={16} bold>
              Masuk
            </Text>
          </Button>
        ) : (
          <>
            <Button
              sizeVariant="large"
              colorVariant="secondary"
              loading={Boolean(loading)}
              disabled={Boolean(
                loading ||
                  errorRegister ||
                  (errors.email?.message && emailValue),
              )}
              onClick={onClickRegister}
            >
              <Text size={16} bold>
                Daftar dengan email
              </Text>
            </Button>
            <Divider />
            <Button
              sizeVariant="large"
              colorVariant="white"
              startIcon={<GoogleLogo />}
              disabled={Boolean(
                loading ||
                  errorRegister ||
                  (errors.email?.message && emailValue),
              )}
            >
              <Text size={16} bold>
                Daftar dengan Google
              </Text>
            </Button>
          </>
        )}
      </CardContainer>
    </Container>
  );
};

export default Register;
