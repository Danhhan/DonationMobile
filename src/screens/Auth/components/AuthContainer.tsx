import { ScrollView, ViewStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

interface IAuthContainerProps {
  children: React.ReactNode;
  justifyContent?: ViewStyle['justifyContent'];
}

const AuthContainer: React.FC<IAuthContainerProps> = ({
  children,
  justifyContent,
}) => {
  const { themed } = useAppTheme();
  return (
    <ScrollView
      contentContainerStyle={[
        themed($container),
        justifyContent ? { justifyContent } : undefined,
      ]}
    >
      {children}
    </ScrollView>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  flex: 1,
  justifyContent: 'center',
});

export default AuthContainer;
