import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Product } from '@/types/product';
import { PackageIcon } from 'lucide-react-native';
import { FlatList } from 'react-native';
import { ProductItem } from './ProductItem';

type Props = {
  products: Product[];
  search: string;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onRefresh: () => void;
  refreshing: boolean;
};

function EmptyList({ search }: { search: string }) {
  return (
    <VStack className="flex-1 items-center justify-center pt-20" space="sm">
      <PackageIcon size={40} color="#D4D4D4" />
      <Text className="text-typography-500">Nenhum produto encontrado</Text>
      <Text className="text-sm text-typography-300">
        {search ? 'Tente outro termo de busca' : 'Adicione o primeiro produto'}
      </Text>
    </VStack>
  );
}

export function ProductList({
  products,
  search,
  onEdit,
  onDelete,
  onRefresh,
  refreshing,
}: Props) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <ProductItem
          product={item}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
          showDivider={index < products.length - 1}
        />
      )}
      contentContainerStyle={[
        { paddingHorizontal: 20, paddingBottom: 32 },
        products.length === 0 && { flex: 1 },
      ]}
      ListEmptyComponent={<EmptyList search={search} />}
      onRefresh={onRefresh}
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
    />
  );
}