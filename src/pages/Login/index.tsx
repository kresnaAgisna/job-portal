import { Stack, styled } from '@mui/material';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Logo from './assets/logo.svg?react';
import GoogleLogo from './assets/google-logo.svg?react';
import KeyIcon from './assets/key-icon.svg?react';
import { Colors } from '../../constants/color';
import Divider from '../../components/molecules/Divider';
import TextInputWrapper from '../../components/molecules/TextInputWrapper';
import { Button, Text, TextInput } from '../../components/atom';
import InputBottomDesc from './components/InputBottomDesc';
import WarningBar from './components/WarningBar';
import { useAppDispatch } from '../../global/redux/store';
import { postLoginUser, resetLoginState, selectLoginState } from './loginSlice';

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

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Alamat email tidak boleh kosong')
    .email({ message: 'Alamat email tidak valid' }),
});

export type LoginData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { errorLogin, loading, successLogin } = useSelector(selectLoginState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: LoginData) => {
    dispatch(postLoginUser(data.email));
  };

  const navigateRegister = () => {
    navigate('/register');
  };

  const emailValue = watch('email');

  useEffect(() => {
    dispatch(resetLoginState());
  }, [emailValue, dispatch]);

  return (
    <Container>
      <Logo />
      <CardContainer onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Text size={20} bold>
            Masuk ke Rakamin
          </Text>
          <Text size={14}>
            Belum punya akun?{' '}
            <Text
              onClick={navigateRegister}
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
              Daftar menggunakan email
            </Text>
          </Text>
        </Stack>
        {errorLogin ? <WarningBar onClick={navigateRegister} /> : null}
        <TextInputWrapper
          label="Alamat email"
          bottomDescription={
            <InputBottomDesc errorMessage={errors.email?.message} />
          }
        >
          <TextInput
            placeholder="contoh@email.com"
            {...register('email')}
            borderColor={errors.email?.message ? Colors.danger.main : undefined}
            focusColor={errors.email?.message ? Colors.danger.main : undefined}
          />
        </TextInputWrapper>

        <Button
          type="submit"
          sizeVariant="large"
          colorVariant="secondary"
          loading={Boolean(loading)}
          disabled={Boolean(
            loading || errorLogin || (errors.email?.message && emailValue),
          )}
        >
          <Text size={16} bold>
            Kirim link
          </Text>
        </Button>
        <Divider />
        <Button
          sizeVariant="large"
          colorVariant="white"
          startIcon={<KeyIcon />}
          disabled={Boolean(
            loading || errorLogin || (errors.email?.message && emailValue),
          )}
        >
          <Text size={16} bold>
            Masuk dengan kata sandi
          </Text>
        </Button>
        <Button
          sizeVariant="large"
          colorVariant="white"
          startIcon={<GoogleLogo />}
          disabled={Boolean(
            loading || errorLogin || (errors.email?.message && emailValue),
          )}
        >
          <Text size={16} bold>
            Daftar dengan Google
          </Text>
        </Button>
      </CardContainer>
    </Container>
  );
};

export default Login;
