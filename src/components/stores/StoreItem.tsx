import { Badge, BadgeText } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { EditIcon, Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Store } from '@/types/store';

type Props = {
  store: Store;
  onPress: () => void;
  onEdit: () => void;
  showDivider: boolean;
};

export function StoreItem({ store, onPress, onEdit, showDivider }: Props) {
  return (
    <Box>
      <Pressable onPress={onPress}>
        <HStack className="py-4 items-start justify-between">
          <VStack space="xs" className="flex-1 pr-4">
            <Text className="font-semibold text-typography-900">
              {store.name}
            </Text>
            <Text className="text-sm text-typography-500">
              {store.address}
            </Text>
            <Badge variant="outline" size="sm" className="self-start mt-1">
              <BadgeText>
                {store.productCount}{' '}
                {store.productCount === 1 ? 'produto' : 'produtos'}
              </BadgeText>
            </Badge>
          </VStack>

          <Pressable onPress={onEdit} hitSlop={8}>
            <Icon as={EditIcon} size="sm" className="text-typography-300 mt-1" />
          </Pressable>
        </HStack>
      </Pressable>
      {showDivider && <Divider />}
    </Box>
  );
}