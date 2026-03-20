import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

type StoreFormValues = {
  name: string;
  address: string;
};

type StoreFormErrors = {
  name?: string;
  address?: string;
};

type Props = {
  values: StoreFormValues;
  errors: StoreFormErrors;
  isLoading: boolean;
  isDisabled: boolean;
  submitLabel: string;
  onChange: (field: keyof StoreFormValues, value: string) => void;
  onSubmit: () => void;
};

export function StoreForm({
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
            placeholder="Ex: Loja Centro"
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
          Endereço
        </Text>
        <Input variant="outline" isInvalid={!!errors.address} className="rounded-xl">
          <InputField
            placeholder="Ex: Rua das Flores, 123 - Centro"
            value={values.address}
            onChangeText={(text) => onChange('address', text)}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
        </Input>
        {errors.address && (
          <Text className="text-sm text-error-600">{errors.address}</Text>
        )}
      </VStack>

      <Button onPress={onSubmit} isDisabled={isDisabled} className="rounded-xl">
        {isLoading ? <ButtonSpinner /> : <ButtonText>{submitLabel}</ButtonText>}
      </Button>
    </VStack>
  );
}