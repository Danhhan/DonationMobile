import { ReactNode, forwardRef, ForwardedRef } from 'react';
// eslint-disable-next-line no-restricted-imports
import { Text as RNText, StyleProp, TextProps, TextStyle } from 'react-native';

import { useAppTheme } from '@/theme/context';
import { ThemedStyle, ThemedStyleArray } from '@/theme/types';
import { getFontFamily, typography } from '@/theme/typography';

type Sizes = keyof typeof $sizeStyles;
type Weights = keyof typeof typography.primary;
type Presets =
  | 'default'
  | 'bold'
  | 'heading'
  | 'subheading'
  | 'formLabel'
  | 'formHelper';

type TextTransform = 'uppercase' | 'lowercase' | 'capitalize';

interface ITextProps extends TextProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
  /**
   * Text weight modifier.
   */
  weight?: Weights;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: ReactNode;

  textTransform?: TextTransform;
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export const Text = forwardRef(function Text(
  props: ITextProps,
  ref: ForwardedRef<RNText>,
) {
  const {
    weight,
    size,
    textTransform,
    text,
    children,
    style: $styleOverride,
    ...rest
  } = props;
  const { themed } = useAppTheme();

  const content = text || children;

  const preset: Presets = props.preset ?? 'default';
  const $styles: StyleProp<TextStyle> = [
    themed($presets[preset]),
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    textTransform && $textTransformStyles[textTransform],
    $styleOverride,
  ];

  return (
    <RNText {...rest} style={$styles} ref={ref}>
      {content}
    </RNText>
  );
});

const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 } satisfies TextStyle,
  xl: { fontSize: 24, lineHeight: 34 } satisfies TextStyle,
  lg: { fontSize: 20, lineHeight: 32 } satisfies TextStyle,
  md: { fontSize: 18, lineHeight: 26 } satisfies TextStyle,
  sm: { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  xs: { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
  xxs: { fontSize: 12, lineHeight: 18 } satisfies TextStyle,
};

const $fontWeightStyles = Object.entries(typography.primary).reduce(
  (acc, [weight, fontFamily]) => {
    return { ...acc, [weight]: { fontFamily } };
  },
  {},
) as Record<Weights, TextStyle>;

const $baseStyle: ThemedStyle<TextStyle> = theme => ({
  ...$sizeStyles.sm,
  ...$fontWeightStyles.normal,
  color: theme.colors.text,
  letterSpacing: 0.5,
  fontFamily: getFontFamily('SpaceGrotesk', '400'),
});

// style text transform
const $textTransformStyles: Record<TextTransform, TextStyle> = {
  uppercase: { textTransform: 'uppercase' },
  lowercase: { textTransform: 'lowercase' },
  capitalize: { textTransform: 'capitalize' },
};

const $presets: Record<Presets, ThemedStyleArray<TextStyle>> = {
  default: [$baseStyle],
  bold: [$baseStyle, { ...$fontWeightStyles.bold }],
  heading: [
    $baseStyle,
    {
      ...$sizeStyles.xxl,
      ...$fontWeightStyles.bold,
    },
  ],
  subheading: [$baseStyle, { ...$sizeStyles.lg, ...$fontWeightStyles.medium }],
  formLabel: [$baseStyle, { ...$fontWeightStyles.medium }],
  formHelper: [$baseStyle, { ...$sizeStyles.sm, ...$fontWeightStyles.normal }],
};
