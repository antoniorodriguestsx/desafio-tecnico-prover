import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { ProductForm, ProductFormErrors, ProductFormValues } from '@/components/products/ProductForm';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { ArrowLeftIcon, Icon } from '@/components/ui/icon';
import { KeyboardAvoidingView } from '@/components/ui/keyboard-avoiding-view';
import { Pressable } from '@/components/ui/pressable';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';

import { useProductStore } from '@/stores/useProductStore';

export default function NewProductScreen() {
  const { id, productId } = useLocalSearchParams<{ id: string; productId?: string }>();
  const { products, createProduct, updateProduct, isLoading } = useProductStore();

  const isEditing = !!productId;
  const existingProduct = isEditing ? products.find((p) => p.id === productId) : null;

  const [values, setValues] = useState<ProductFormValues>({
    name: '',
    category: '',
    price: '',
  });
  const [errors, setErrors] = useState<ProductFormErrors>({});

  useEffect(() => {
    if (existingProduct) {
      setValues({
        name: existingProduct.name,
        category: existingProduct.category,
        price: existingProduct.price.toString(),
      });
    }
  }, [existingProduct]);

  function handleChange(field: keyof ProductFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: ProductFormErrors = {};
    if (!values.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!values.category.trim()) newErrors.category = 'Categoria é obrigatória';
    const parsed = parseFloat(values.price.replace(',', '.'));
    if (!values.price.trim()) newErrors.price = 'Preço é obrigatório';
    else if (isNaN(parsed) || parsed <= 0) newErrors.price = 'Preço inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;
    const price = parseFloat(values.price.replace(',', '.'));
    if (isEditing && productId) {
      await updateProduct(productId, {
        name: values.name.trim(),
        category: values.category.trim(),
        price,
      });
    } else {
      await createProduct({
        storeId: id,
        name: values.name.trim(),
        category: values.category.trim(),
        price,
      });
    }
    router.back();
  }

  const isDisabled =
    isLoading ||
    !values.name.trim() ||
    !values.category.trim() ||
    !values.price.trim();

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
            <Text className="text-lg font-bold text-typography-900">
              {isEditing ? 'Editar produto' : 'Novo produto'}
            </Text>
            <Box className="w-10" />
          </HStack>
        </Box>

        <ScrollView>
          <ProductForm
            values={values}
            errors={errors}
            isLoading={isLoading}
            isDisabled={isDisabled}
            submitLabel={isEditing ? 'Salvar alterações' : 'Criar produto'}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}