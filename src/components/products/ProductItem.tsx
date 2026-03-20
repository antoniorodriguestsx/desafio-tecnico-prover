import { Badge, BadgeText } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { EditIcon, Icon, TrashIcon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

import { Product } from '@/types/product';

type Props = {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  showDivider: boolean;
};

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function ProductItem({ product, onEdit, onDelete, showDivider }: Props) {
  return (
    <Box>
      <VStack space="xs" className="py-4">
        <HStack className="items-start justify-between">
          <Text className="font-semibold text-typography-900 flex-1 pr-4">
            {product.name}
          </Text>
          <Text className="font-bold text-typography-900">
            {formatPrice(product.price)}
          </Text>
        </HStack>

        <Badge variant="outline" size="sm" className="self-start">
          <BadgeText>{product.category}</BadgeText>
        </Badge>

        <HStack space="sm" className="mt-1">
          <Pressable
            onPress={onEdit}
            className="flex-row items-center gap-1 px-3 py-1.5 rounded-lg bg-background-100"
          >
            <Icon as={EditIcon} size="xs" className="text-typography-600" />
            <Text className="text-xs text-typography-600 font-medium">Editar</Text>
          </Pressable>

          <Pressable
            onPress={onDelete}
            className="flex-row items-center gap-1 px-3 py-1.5 rounded-lg bg-error-50"
          >
            <Icon as={TrashIcon} size="xs" className="text-error-600" />
            <Text className="text-xs text-error-600 font-medium">Remover</Text>
          </Pressable>
        </HStack>
      </VStack>

      {showDivider && <Divider />}
    </Box>
  );
}