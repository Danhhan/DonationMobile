import { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, View, ViewStyle } from 'react-native';

import { useCategories } from '@/apis/category/getCategories';
import { useDonations } from '@/apis/donation/getDonations';
import ActivityIndicator from '@/components/ActivityIndicator';
import Screen from '@/components/Screen';
import { Text } from '@/components/Text';
import { useInitialNumToRender } from '@/hooks/useInitialNumToRender';
import { useAppTheme } from '@/theme/context';
import { ThemedStyle } from '@/theme/types';

import { CategoriesSkeleton } from './components/CategoriesSkeleton';
import CategoryList from './components/CategoryList';
import DonationCard from './components/DonationCard';
import { DonationsSkeleton } from './components/DonationsSkeleton';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchField from './components/SearchField';

export const HomeScreen = () => {
  const {
    themed,
    theme: { colors },
  } = useAppTheme();
  const [isPTRing, setIsPTRing] = useState(false);
  const initialNumToRender = useInitialNumToRender();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const categoryData = useCategories();
  const categoryItems = categoryData?.data?.data;
  const categoryId = useMemo(() => {
    return categoryItems?.[selectedIdx]?.id;
  }, [selectedIdx, categoryItems]);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useDonations({
    categoryId,
  });

  const donations = useMemo(() => {
    if (data?.pages) {
      return data?.pages.flatMap(page => page.data);
    }
    return [];
  }, [data]);

  const onEndReached = useCallback(async () => {
    console.log('reach end');
    if (isFetchingNextPage || !hasNextPage || isError) return;
    try {
      await fetchNextPage();
    } catch (err) {
      console.log('err :', err);
    }
  }, [isFetchingNextPage, hasNextPage, isError, fetchNextPage]);

  const onRefresh = useCallback(async () => {
    setIsPTRing(true);
    try {
      await refetch();
    } catch (err) {
      console.error('Failed to refresh lists', err);
    }
    setIsPTRing(false);
  }, [refetch, setIsPTRing]);

  return (
    <Screen safeAreaEdges={['top']} backgroundColor={colors.palette.neutral100}>
      <View style={themed($container)}>
        <FlatList
          data={donations || []}
          numColumns={2}
          columnWrapperStyle={themed($donationList)}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            <>
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

              {isLoading && <DonationsSkeleton />}
            </>
          }
          refreshControl={
            <RefreshControl
              refreshing={isPTRing}
              onRefresh={onRefresh}
              tintColor={colors.palette.neutral500}
              titleColor={colors.palette.neutral500}
            />
          }
          renderItem={({ item }) => (
            <DonationCard
              data={item}
              categoryList={categoryData?.data?.data || []}
            />
          )}
          initialNumToRender={initialNumToRender}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator size="small" /> : null
          }
        />
      </View>
    </Screen>
  );
};

const $donationList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
  justifyContent: 'space-between',
  rowGap: spacing.md,
});

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
});
