import { Stack } from 'expo-router';
import { SepetProvider } from '../context/SepetContext';

export default function Layout() {
  return (
    <SepetProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fff8ee' } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="urun/[id]" />
        <Stack.Screen name="sepet" />
      </Stack>
    </SepetProvider>
  );
}
