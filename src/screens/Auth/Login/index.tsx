import { FC, useMemo, useState } from 'react';
import { Alert, View, ViewStyle } from 'react-native';

import { useAuthLogin } from '@/apis/auth/login';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import PageHeader from '@/components/PageHeader';
import Screen from '@/components/Screen';
import { useAuth } from '@/context/AuthContext';
import { AppStackScreenProps } from '@/navigators/navigationTypes';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

import AuthContainer from '../components/AuthContainer';
import AuthSwitchText from '../components/AuthSwitchText';

interface LoginScreenProps extends AppStackScreenProps<'Login'> {}

interface IErrorForm {
  email?: string;
  password?: string;
}

export const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const { setAuthToken } = useAuth();
  const { themed } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutateAsync: login, isPending } = useAuthLogin({
    mutationConfig: {
      onSuccess: data => {
        console.log('data :', data);
        setAuthToken(data.token);
        Alert.alert('Success', 'Login successful');
      },
    },
  });

  const validationError = useMemo(() => {
    const error: IErrorForm = {};
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
    if (password.length < 6) {
      error.password = 'must be at least 6 characters';
    }
    return error;
  }, [email, password]);

  const error = isSubmitted ? validationError : null;

  const onLogin = () => {
    setIsSubmitted(true);
    if (Object.keys(validationError).length > 0) return;
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
            helper={error?.email}
          />
          <Input
            secureTextEntry
            label="Password"
            placeholder="Password"
            onChangeText={val => setPassword(val)}
            value={password}
            helper={error?.password}
          />
        </View>
        <Button
          onPress={() => {
            onLogin();
          }}
        >
          {isPending ? 'Logging in...' : 'Login'}
        </Button>
        <AuthSwitchText
          onPress={() => navigation.navigate('Register')}
          title="Don't have an account?"
        />
      </AuthContainer>
    </Screen>
  );
};

const $form: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  marginBottom: spacing.xxl,
});
