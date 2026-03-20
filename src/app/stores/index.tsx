import { StoreList } from '@/components/stores/StoreList';
import { StoreSearch } from '@/components/stores/StoreSearch';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { AddIcon, Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';

import { useStore } from '@/stores/useStore';
import { Store } from '@/types/store';

import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

export default function StoresScreen() {
  const { stores, isLoading, fetchStores } = useStore();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStores();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchStores();
    setRefreshing(false);
  }, []);

  const filtered = stores.filter(
    (s) =>
      (s.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (s.address ?? '').toLowerCase().includes(search.toLowerCase())
  );

  function handlePressStore(store: Store) {
    router.push({
      pathname: '/stores/[id]/products',
      params: { id: store.id }
    });
  }

  function handleEditStore(store: Store) {
    router.push({
      pathname: '/stores/[id]/edit',
      params: { id: store.id }
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Box className="px-5 pt-4 pb-4">
        <HStack className="items-center justify-between mb-4">
          <Text className="text-3xl font-bold text-typography-900">Lojas</Text>
          <Pressable
            onPress={() => router.push('/stores/new')}
            className="w-10 h-10 rounded-full bg-typography-900 items-center justify-center"
          >
            <Icon as={AddIcon} size="sm" className="text-background-0" />
          </Pressable>
        </HStack>

        <StoreSearch
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
        />
      </Box>

      {isLoading && !refreshing ? (
        <Box className="flex-1 items-center justify-center">
          <Spinner size="large" />
        </Box>
      ) : (
        <StoreList
          stores={filtered}
          search={search}
          onPressStore={handlePressStore}
          onEditStore={handleEditStore}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
    </SafeAreaView>
  );
}