import { useMemo, useState } from 'react';
import { ScrollView, ViewStyle } from 'react-native';

import Screen from '@/components/Screen';
import { categories } from '@/mockData/categories';
import { donations } from '@/mockData/donations';
import { AppStackScreenProps } from '@/navigators/navigationTypes';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

import CategoryList from './components/CategoryList';
import DonationCardList from './components/DonationCardList';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchField from './components/SearchField';

interface IHomeScreenProps extends AppStackScreenProps<'Home'> {}

export const HomeScreen: React.FC<IHomeScreenProps> = () => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const categoryItems = useMemo(() => {
    return categories;
  }, []);

  const donationItems = useMemo(() => {
    const filteredDonations = donations.filter(donation => {
      return donation.categoryIds.includes(
        categoryItems[selectedIdx].categoryId,
      );
    });
    return filteredDonations;
  }, [selectedIdx, categoryItems]);

  return (
    <Screen safeAreaEdges={['top']} backgroundColor={colors.palette.neutral100}>
      <ScrollView
        style={themed($container)}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <SearchField />
        <Hero />
        <CategoryList
          dataList={categoryItems}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
        <DonationCardList
          dataList={donationItems}
          categoryList={categoryItems}
        />
      </ScrollView>
    </Screen>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
});
