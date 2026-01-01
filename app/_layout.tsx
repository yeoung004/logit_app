import { AppSplash } from "@/components/ui/AppSplash";
import { AppJotaiStoreProvider } from "@/hooks/app-level-store";
import { useSplashLoading } from "@/hooks/useSplashLoading";
import { LogitIntlProvider } from "@/libs/LogitIntlProvider";
import { LogitThemeProvider } from "@/libs/LogitThemeProvider";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { some } from "lodash-es";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppJotaiStoreProvider>
        <LogitThemeProvider>
          <LogitIntlProvider>
            <Main />
          </LogitIntlProvider>
        </LogitThemeProvider>
      </AppJotaiStoreProvider>
    </SafeAreaProvider>
  );
}

const Main = () => {
  const [loadings] = useSplashLoading("");

  const someLoading = React.useMemo(() => some(loadings), [loadings]);

  if (someLoading) {
    return <AppSplash />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};
