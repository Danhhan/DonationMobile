import { useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';

import Screen from '@/components/Screen';
import { categories } from '@/mockData/categories';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

import CategoryList from './components/CategoryList';
import DonationCardList from './components/DonationCardList';
import { Header } from './components/Header';
import Hero from './components/Hero';
import SearchField from './components/SearchField';

interface IHomeScreenProps {}

export const HomeScreen: React.FC<IHomeScreenProps> = () => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const categoryItems = useMemo(() => {
    return categories;
  }, []);

  return (
    <Screen
      safeAreaEdges={['top', 'bottom']}
      backgroundColor={colors.palette.neutral100}
    >
      <View style={themed($container)}>
        <Header />
        <SearchField />
        <Hero />
        <CategoryList
          dataList={categoryItems}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
        <DonationCardList />
      </View>
    </Screen>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
});
