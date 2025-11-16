import { useMemo, useState } from 'react';
import { ScrollView, ViewStyle } from 'react-native';

import { useCategories } from '@/apis/category/getCategories';
import { useDonations } from '@/apis/donation/getDonations';
import Screen from '@/components/Screen';
import { Text } from '@/components/Text';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

import { CategoriesSkeleton } from './components/CategoriesSkeleton';
import CategoryList from './components/CategoryList';
import DonationCardList from './components/DonationCardList';
import { DonationsSkeleton } from './components/DonationsSkeleton';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchField from './components/SearchField';

export const HomeScreen = () => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const categoryData = useCategories();
  const categoryItems = categoryData?.data?.data;
  const categoryId = useMemo(() => {
    return categoryItems?.[selectedIdx]?.id;
  }, [selectedIdx, categoryItems]);

  const donationData = useDonations({
    categoryId,
  });

  return (
    <Screen safeAreaEdges={['top']} backgroundColor={colors.palette.neutral100}>
      <ScrollView
        style={themed($container)}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <SearchField />
        <Hero />
        <Text size="md" preset="bold">
          Select Category
        </Text>
        {categoryData?.isLoading && <CategoriesSkeleton />}
        {!categoryData?.isLoading &&
          categoryItems &&
          categoryItems.length > 0 && (
            <CategoryList
              dataList={categoryItems}
              selectedIdx={selectedIdx}
              setSelectedIdx={setSelectedIdx}
            />
          )}
        {donationData?.isLoading && <DonationsSkeleton />}
        {!donationData?.isLoading &&
          donationData?.data &&
          donationData?.data?.data.length > 0 && (
            <DonationCardList
              dataList={donationData?.data?.data}
              categoryList={categoryData?.data?.data || []}
            />
          )}
      </ScrollView>
    </Screen>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
});
