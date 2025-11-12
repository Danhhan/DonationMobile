import { PressableIcon } from '@/components/Icon';
import Screen from '@/components/Screen';
import { AppStackScreenProps } from '@/navigators/navigationTypes';
import { useAppTheme } from '@/theme/context';

interface IDonationDetailScreenProps
  extends AppStackScreenProps<'DonationDetail'> {}

const DonationDetailScreen: React.FC<IDonationDetailScreenProps> = ({
  navigation,
}) => {
  const {
    theme: { colors },
  } = useAppTheme();
  return (
    <Screen
      safeAreaEdges={['top', 'bottom']}
      backgroundColor={colors.palette.neutral100}
    >
      <PressableIcon
        size={24}
        icon="back"
        onPress={() => navigation.goBack()}
      />
    </Screen>
  );
};

export default DonationDetailScreen;
