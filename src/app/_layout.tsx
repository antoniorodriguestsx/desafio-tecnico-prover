// src/app/_layout.tsx
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { startMockServer } from '@/mocks';
import { Stack } from 'expo-router';

startMockServer();

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="stores/index" />
        <Stack.Screen name="stores/new" />
        <Stack.Screen name="stores/[id]/edit" />
        <Stack.Screen name="stores/[id]/products/index" />
        <Stack.Screen name="stores/[id]/products/new" />
      </Stack>
    </GluestackUIProvider>
  );
}