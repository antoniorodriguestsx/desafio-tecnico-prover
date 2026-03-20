import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';

import { StoreForm } from '@/components/stores/StoreForm';
import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
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

export default function EditStoreScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { selectedStore, isLoading, fetchStoreById, updateStore, removeStore } =
    useStore();

  const [values, setValues] = useState<FormValues>({ name: '', address: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (id) fetchStoreById(id);
  }, [id]);

  useEffect(() => {
    if (selectedStore) {
      setValues({
        name: selectedStore.name ?? '',
        address: selectedStore.address ?? '',
      });
    }
  }, [selectedStore?.id]);

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!values.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!values.address.trim()) newErrors.address = 'Endereço é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    await updateStore(id, {
      name: values.name.trim(),
      address: values.address.trim(),
    });
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/stores');
    }
  }

  function handleDelete() {
    Alert.alert(
      'Remover loja',
      `Deseja remover "${selectedStore?.name}"? Todos os produtos serão perdidos.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            await removeStore(id);
            router.replace('/stores');
          },
        },
      ]
    );
  }

  if (isLoading || !selectedStore) {
    return (
      <Box className="flex-1 items-center justify-center bg-background-0">
        <ActivityIndicator size="large" color="#1a1a1a" />
      </Box>
    );
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
            <Text className="text-lg font-bold text-typography-900">Editar loja</Text>
            <Box className="w-10" />
          </HStack>
        </Box>

        <ScrollView>
          <StoreForm
            values={values}
            errors={errors}
            isLoading={isLoading}
            isDisabled={isDisabled}
            submitLabel="Salvar alterações"
            onChange={handleChange}
            onSubmit={handleSubmit}
          />

          <Box className="px-5 mt-4">
            <Button
              variant="outline"
              action="negative"
              onPress={handleDelete}
              className="rounded-xl"
            >
              <ButtonText>Remover loja</ButtonText>
            </Button>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}