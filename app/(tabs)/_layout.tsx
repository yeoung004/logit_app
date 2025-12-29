import { LogitTabBar } from "@/components/ui/TabBar";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 0 }}
      tabBar={(props) => <LogitTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="note" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="plan" />
      <Tabs.Screen name="menu" />
    </Tabs>
  );
}
