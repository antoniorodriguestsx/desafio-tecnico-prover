import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Store } from '@/types/store';
import { FlatList } from 'react-native';
import { StoreItem } from './StoreItem';

type Props = {
  stores: Store[];
  search: string;
  onPressStore: (store: Store) => void;
  onEditStore: (store: Store) => void;
  onRefresh: () => void;
  refreshing: boolean;
};

function EmptyList({ search }: { search: string }) {
  return (
    <VStack className="flex-1 items-center justify-center pt-20" space="sm">
      <Text className="text-typography-500">Nenhuma loja encontrada</Text>
      <Text className="text-sm text-typography-300">
        {search ? 'Tente outro termo de busca' : 'Adicione sua primeira loja'}
      </Text>
    </VStack>
  );
}

export function StoreList({
  stores,
  search,
  onPressStore,
  onEditStore,
  onRefresh,
  refreshing,
}: Props) {
  return (
    <FlatList
      data={stores}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <StoreItem
          store={item}
          onPress={() => onPressStore(item)}
          onEdit={() => onEditStore(item)}
          showDivider={index < stores.length - 1}
        />
      )}
      contentContainerStyle={[
        { paddingHorizontal: 20, paddingBottom: 32 },
        stores.length === 0 && { flex: 1 },
      ]}
      ListEmptyComponent={<EmptyList search={search} />}
      onRefresh={onRefresh}
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
    />
  );
}