/* eslint-disable @typescript-eslint/no-shadow */
import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  View,
  ViewStyle,
} from 'react-native';
import {
  SystemBars,
  SystemBarsProps,
  SystemBarStyle,
} from 'react-native-edge-to-edge';

import { useAppTheme } from '@/theme/context';
import { $styles } from '@/theme/styles';
import {
  ExtendedEdge,
  useSafeAreaInsetsStyle,
} from '@/utils/useSafeAreaInsetsStyle';

interface IScreenProps {
  /**
   * Children components.
   */
  children?: ReactNode;
  /**
   * Pass any additional props directly to the SystemBars component.
   */
  SystemBarsProps?: SystemBarsProps;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * System bar setting. Defaults to dark.
   */
  systemBarStyle?: SystemBarStyle;
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[];
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
}

const isIos = Platform.OS === 'ios';

const Screen = (props: IScreenProps) => {
  const {
    children,
    backgroundColor,
    systemBarStyle,
    SystemBarsProps,
    safeAreaEdges,
    KeyboardAvoidingViewProps,
  } = props;
  const {
    theme: { colors },
    themeContext,
  } = useAppTheme();

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);
  return (
    <View
      style={[
        $containerStyle,
        { backgroundColor: backgroundColor || colors.background },
        $containerInsets,
      ]}
    >
      <SystemBars
        style={systemBarStyle || (themeContext === 'dark' ? 'light' : 'dark')}
        {...SystemBarsProps}
      />
      <KeyboardAvoidingView
        {...KeyboardAvoidingViewProps}
        behavior={isIos ? 'padding' : 'height'}
        style={[$styles.flex1, KeyboardAvoidingViewProps?.style]}
      >
        {children}
      </KeyboardAvoidingView>
      {/* {children} */}
    </View>
  );
};

const $containerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

export default Screen;
