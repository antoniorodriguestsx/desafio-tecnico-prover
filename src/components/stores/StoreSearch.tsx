import { CloseIcon, SearchIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
};

export function StoreSearch({ value, onChangeText, onClear }: Props) {
  return (
    <Input variant="outline" size="md" className="rounded-xl bg-background-50">
      <InputSlot className="pl-3">
        <InputIcon as={SearchIcon} className="text-typography-400" />
      </InputSlot>
      <InputField
        placeholder="Buscar lojas..."
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <InputSlot className="pr-3">
          <Pressable onPress={onClear}>
            <InputIcon as={CloseIcon} className="text-typography-400" />
          </Pressable>
        </InputSlot>
      )}
    </Input>
  );
}