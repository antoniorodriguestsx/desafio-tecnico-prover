import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export type ProductFormValues = {
  name: string;
  category: string;
  price: string;
};

export type ProductFormErrors = {
  name?: string;
  category?: string;
  price?: string;
};

type Props = {
  values: ProductFormValues;
  errors: ProductFormErrors;
  isLoading: boolean;
  isDisabled: boolean;
  submitLabel: string;
  onChange: (field: keyof ProductFormValues, value: string) => void;
  onSubmit: () => void;
};

export function ProductForm({
  values,
  errors,
  isLoading,
  isDisabled,
  submitLabel,
  onChange,
  onSubmit,
}: Props) {
  return (
    <VStack space="xl" className="px-5 pt-4">
      <VStack space="xs">
        <Text className="text-xs font-semibold text-typography-500 uppercase tracking-wider">
          Nome
        </Text>
        <Input variant="outline" isInvalid={!!errors.name} className="rounded-xl">
          <InputField
            placeholder="Ex: Camiseta Básica"
            value={values.name}
            onChangeText={(text) => onChange('name', text)}
            autoFocus
            returnKeyType="next"
          />
        </Input>
        {errors.name && (
          <Text className="text-sm text-error-600">{errors.name}</Text>
        )}
      </VStack>

      <VStack space="xs">
        <Text className="text-xs font-semibold text-typography-500 uppercase tracking-wider">
          Categoria
        </Text>
        <Input variant="outline" isInvalid={!!errors.category} className="rounded-xl">
          <InputField
            placeholder="Ex: Vestuário"
            value={values.category}
            onChangeText={(text) => onChange('category', text)}
            returnKeyType="next"
          />
        </Input>
        {errors.category && (
          <Text className="text-sm text-error-600">{errors.category}</Text>
        )}
      </VStack>

      <VStack space="xs">
        <Text className="text-xs font-semibold text-typography-500 uppercase tracking-wider">
          Preço
        </Text>
        <Input variant="outline" isInvalid={!!errors.price} className="rounded-xl">
          <InputField
            placeholder="Ex: 49.90"
            value={values.price}
            onChangeText={(text) => onChange('price', text)}
            keyboardType="decimal-pad"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
        </Input>
        {errors.price && (
          <Text className="text-sm text-error-600">{errors.price}</Text>
        )}
      </VStack>

      <Button onPress={onSubmit} isDisabled={isDisabled} className="rounded-xl">
        {isLoading ? <ButtonSpinner /> : <ButtonText>{submitLabel}</ButtonText>}
      </Button>
    </VStack>
  );
}