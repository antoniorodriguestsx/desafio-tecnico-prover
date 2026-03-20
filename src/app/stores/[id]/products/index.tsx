import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { ProductList } from '@/components/products/ProductList';
import { ProductSearch } from '@/components/products/ProductSearch';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { AddIcon, ArrowLeftIcon, Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { useProductStore } from '@/stores/useProductStore';
import { useStore } from '@/stores/useStore';

import { Product } from '@/types/product';

export default function ProductsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { products, isLoading, fetchProducts, removeProduct } = useProductStore();
  const { selectedStore, fetchStoreById } = useStore();
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (id) {
      fetchStoreById(id);
      fetchProducts(id);
    }
  }, [id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchProducts(id);
    setRefreshing(false);
  }, [id]);

  function handleEdit(product: Product) {
    router.push({
      pathname: '/stores/[id]/products/new',
      params: { id: id || '', productId: product.id }
    });
  }

  function handleDelete(product: Product) {
    Alert.alert(
      'Remover produto',
      `Deseja remover "${product.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => removeProduct(product.id),
        },
      ]
    );
  }

  const filtered = products.filter(
    (p) =>
      (p.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (p.category ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <Box className="px-5 pt-4 pb-4">
        <HStack className="items-center justify-between mb-4">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-background-100 items-center justify-center"
          >
            <Icon as={ArrowLeftIcon} size="sm" className="text-typography-900" />
          </Pressable>

          <VStack className="items-center flex-1">
            <Text className="text-lg font-bold text-typography-900">
              {selectedStore?.name ?? 'Produtos'}
            </Text>
            <Text className="text-sm text-typography-500">
              {filtered.length}{' '}
              {filtered.length === 1 ? 'produto' : 'produtos'}
            </Text>
          </VStack>

          <Pressable
            onPress={() => router.push({
              pathname: '/stores/[id]/products/new',
              params: { id: id || '' }
            })}
            className="w-10 h-10 rounded-full bg-typography-900 items-center justify-center"
          >
            <Icon as={AddIcon} size="sm" className="text-background-0" />
          </Pressable>
        </HStack>

        <ProductSearch
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
        <ProductList
          products={filtered}
          search={search}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      )}
    </SafeAreaView>
  );
}