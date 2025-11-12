import { FC, useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { toast } from 'sonner-native';

import { useAuthRegister } from '@/apis/auth/register';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import PageHeader from '@/components/PageHeader';
import Screen from '@/components/Screen';
import HTTP_CODES_ENUM from '@/constants/httpCode';
import { AppStackScreenProps } from '@/navigators/navigationTypes';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';
import { IErrorForm } from '@/types/common';

import AuthContainer from '../components/AuthContainer';
import AuthSwitchText from '../components/AuthSwitchText';

interface IErrorFormValues {
  email?: string;
  password?: string;
  firstAndLastName?: string;
}

interface RegisterScreenProps extends AppStackScreenProps<'Register'> {}
export const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const { themed } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  // first & last name
  const [firstAndLastName, setFirstAndLastName] = useState('');
  const { mutateAsync: register, isPending } = useAuthRegister({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Register success');
        navigation.navigate('Login');
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
        toast.error(err?.message || 'Register failed');
      },
    },
  });

  const validationError = useMemo(() => {
    const error: IErrorFormValues = {};
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
    if (!firstAndLastName || firstAndLastName.length === 0) {
      error.firstAndLastName = "can't be blank";
    }
    return error;
  }, [email, password, firstAndLastName]);

  const error = isSubmitted ? validationError : null;

  const onRegister = () => {
    setIsSubmitted(true);
    if (isPending || Object.keys(validationError).length > 0) {
      return;
    }
    setIsSubmitted(false);
    register({
      fullName: firstAndLastName,
      email,
      password,
      bizName: 'test',
    });
  };

  return (
    <Screen safeAreaEdges={['top', 'bottom']}>
      <AuthContainer justifyContent="flex-start">
        <View style={themed($formContainer)}>
          <PageHeader title="Hello and Welcome !" />
          <View style={themed($form)}>
            <Input
              label="First & Last Name"
              placeholder="First & Last Name"
              onChangeText={val => setFirstAndLastName(val)}
              value={firstAndLastName}
              helper={error?.firstAndLastName}
            />
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
          <Button isLoading={isPending} onPress={onRegister}>
            Register
          </Button>
          <AuthSwitchText
            onPress={() => navigation.navigate('Login')}
            title="Already have an account?"
          />
        </View>
      </AuthContainer>
    </Screen>
  );
};

const $formContainer: ThemedStyle<ViewStyle> = () => ({
  ...$styles.flex1,
  justifyContent: 'center',
});

const $form: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  marginBottom: spacing.xxl,
});
