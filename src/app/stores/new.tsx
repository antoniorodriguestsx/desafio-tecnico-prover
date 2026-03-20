import { router } from 'expo-router';
import { useState } from 'react';
import { Platform } from 'react-native';

import { StoreForm } from '@/components/stores/StoreForm';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { ArrowLeftIcon, Icon } from '@/components/ui/icon';
import { KeyboardAvoidingView } from '@/components/ui/keyboard-avoiding-view';
import { Pressable } from '@/components/ui/pressable';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { useStore } from '@/stores/useStore';

type FormValues = { name: string; address: string };
type FormErrors = { name?: string; address?: string };

export default function NewStoreScreen() {
  const { createStore, isLoading } = useStore();
  const [values, setValues] = useState<FormValues>({ name: '', address: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (errors[field])
      setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!values.name.trim())
        newErrors.name = 'Nome é obrigatório';

    if (!values.address.trim())
        newErrors.address = 'Endereço é obrigatório';
      
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    await createStore({ name: values.name.trim(), address: values.address.trim() });
    router.back();
  }

  const isDisabled = isLoading || !values.name.trim() || !values.address.trim();

  return (
    <SafeAreaView className="flex-1 bg-background-0">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <Box className="px-5 pt-4 pb-4">
          <HStack className="items-center justify-between">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-background-100 items-center justify-center"
            >
              <Icon as={ArrowLeftIcon} size="sm" className="text-typography-900" />
            </Pressable>
            <Text className="text-lg font-bold text-typography-900">Nova loja</Text>
            <Box className="w-10" />
          </HStack>
        </Box>

        <ScrollView>
          <StoreForm
            values={values}
            errors={errors}
            isLoading={isLoading}
            isDisabled={isDisabled}
            submitLabel="Criar loja"
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}