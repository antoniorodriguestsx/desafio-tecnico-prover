import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

import { startMockServer } from '@/mocks';
startMockServer();

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="home/index" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>

  );
}