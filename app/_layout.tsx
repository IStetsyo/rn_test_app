import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: 'User List' }}/>
      <Stack.Screen name="modal" options={{ presentation: "modal", headerTitle: 'User Modal' }}/>
    </Stack>
  );
}
