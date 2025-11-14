import { useEffect, useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { toast } from 'sonner-native';

import { useAuthLogin } from '@/apis/auth/login';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import PageHeader from '@/components/PageHeader';
import Screen from '@/components/Screen';
import HTTP_CODES_ENUM from '@/constants/httpCode';
import { useAuth } from '@/context/AuthContext';
import { AppStackScreenProps } from '@/navigators/navigationTypes';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';
import { IErrorForm } from '@/types/common';
import { loadAuthInfo, saveAuthInfo } from '@/utils/storage/auth';

import AuthContainer from '../components/AuthContainer';
import AuthSwitchText from '../components/AuthSwitchText';

interface LoginScreenProps extends AppStackScreenProps<'Login'> {}

interface IErrorValidate {
  email?: string;
  password?: string;
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { setTokensInfo, setUser } = useAuth();
  const { themed } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const authInfo = loadAuthInfo();
    if (authInfo) {
      setEmail(authInfo.email);
      setPassword(authInfo.password);
    }
  }, []);

  const { mutateAsync: login, isPending } = useAuthLogin({
    mutationConfig: {
      onSuccess: data => {
        const loginInfo = data?.data;
        setTokensInfo({
          token: loginInfo.token,
          refreshToken: loginInfo.refreshToken,
          tokenExpires: loginInfo.tokenExpires,
        });
        saveAuthInfo({
          email,
          password,
        });
        setUser(loginInfo?.user);
      },
      onError: (err: any) => {
        if (err.statusCode === HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY) {
          const errorRes = (err as IErrorForm).errors;
          if (errorRes) {
            const errors = Object.entries(errorRes).map(([_, value]) => {
              return value;
            });
            toast.error(errors.join(', '));
            return;
          }
        }
        toast.error(err?.message || 'Login failed');
      },
    },
  });

  const validationError = useMemo(() => {
    const error: IErrorValidate = {};
    if (!email || email.length === 0) {
      error.email = "can't be blank";
    }
    if (email.length < 6) {
      error.email = 'must be at least 6 characters';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error.email = 'must be a valid email address';
    }
    if (!password || password.length === 0) {
      error.password = "can't be blank";
    }
    return error;
  }, [email, password]);

  const errorForm = isSubmitted ? validationError : null;

  const onLogin = () => {
    setIsSubmitted(true);
    if (isPending || Object.keys(validationError).length > 0) {
      return;
    }
    setIsSubmitted(false);
    login({ email, password });
  };

  return (
    <Screen safeAreaEdges={['top', 'bottom']}>
      <AuthContainer>
        <PageHeader title="Welcome Back" />
        <View style={themed($form)}>
          <Input
            keyboardType="email-address"
            label="Email"
            placeholder="Email"
            onChangeText={val => setEmail(val)}
            value={email}
            helper={errorForm?.email}
          />
          <Input
            secureTextEntry
            label="Password"
            placeholder="Password"
            onChangeText={val => setPassword(val)}
            value={password}
            helper={errorForm?.password}
          />
        </View>
        <View style={themed($button)}>
          <Button isLoading={isPending} onPress={onLogin}>
            Login
          </Button>
        </View>
        <AuthSwitchText
          onPress={() => navigation.navigate('Register')}
          title="Don't have an account?"
        />
      </AuthContainer>
    </Screen>
  );
};

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
});

const $form: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  marginBottom: spacing.xxl,
});
