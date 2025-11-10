import { FC, useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';

import Button from '@/components/Button';
import { PressableIcon } from '@/components/Icon';
import { Input } from '@/components/Input';
import PageHeader from '@/components/PageHeader';
import Screen from '@/components/Screen';
import { AppStackScreenProps } from '@/navigators/navigationTypes';
import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import { ThemedStyle } from '@/theme/types';

import AuthContainer from '../components/AuthContainer';
import AuthSwitchText from '../components/AuthSwitchText';

interface IErrorForm {
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
    if (!firstAndLastName || firstAndLastName.length === 0) {
      error.firstAndLastName = "can't be blank";
    }
    return error;
  }, [email, password, firstAndLastName]);

  const error = isSubmitted ? validationError : null;

  const onRegister = () => {
    setIsSubmitted(true);
    if (validationError) return;
  };

  return (
    <Screen safeAreaEdges={['top', 'bottom']}>
      <AuthContainer justifyContent="flex-start">
        <PressableIcon
          size={24}
          icon="back"
          onPress={() => navigation.goBack()}
        />
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
          <Button onPress={onRegister}>Register</Button>
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
