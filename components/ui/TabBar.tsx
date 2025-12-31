import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image as ExpoImage } from "expo-image";
import React from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const LogitTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBarContainer,
        { marginBottom: bottom + (Platform.select({ android: 15 }) ?? 0) },
      ]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const getIconSource = (name: string, focused: boolean) => {
            switch (name) {
              case "note":
                return focused
                  ? require("@/assets/svg/note_active.svg")
                  : require("@/assets/svg/note_inactive.svg");
              case "index":
                return focused
                  ? require("@/assets/svg/menu_active.svg")
                  : require("@/assets/svg/menu_inactive.svg");
              case "plan":
                return focused
                  ? require("@/assets/svg/flag_active.svg")
                  : require("@/assets/svg/flag_inactive.svg");
              case "menu":
                return focused
                  ? require("@/assets/svg/bolt_active.svg")
                  : require("@/assets/svg/bolt_inactive.svg");
              default:
                return null;
            }
          };

          return (
            <Pressable key={route.key} onPress={onPress} style={styles.tabItem}>
              <View
                style={[
                  styles.iconContainer,
                  isFocused && styles.activeBackground,
                ]}
              >
                <TabIcon source={getIconSource(route.name, isFocused)} />
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const TabIcon = ({ source }: { source: any }) => {
  return (
    <ExpoImage
      source={source}
      style={{ width: 24, height: 24 }}
      contentFit="contain"
    />
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center", // 중앙 정렬
    backgroundColor: "transparent",
  },
  tabBar: {
    flexDirection: "row",
    width: Dimensions.get("window").width - 40,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 15,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  activeBackground: {
    backgroundColor: "#F0F7FF",
  },
});
