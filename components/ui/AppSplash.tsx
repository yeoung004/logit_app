import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Typography } from "../theme/Typography";

export const AppSplash = React.memo(function AppSplash() {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(-9, { duration: 2000 }),
        withTiming(0, { duration: 400 }),
        withTiming(-3, { duration: 400 }),
        withTiming(0, { duration: 400 }),
        withTiming(-2, { duration: 400 }),
        withTiming(0, { duration: 700 })
      ),
      -1,
      true
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${interpolate(rotation.value, [-1, 1], [-5, 5])}deg`,
        },
      ],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
      }}
    >
      <Animated.View
        style={[
          {
            borderRadius: 15,
            backgroundColor: "#5288FF",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          animatedStyle,
        ]}
      >
        <Image
          style={{ width: 100, aspectRatio: 1 }}
          source={require("@/assets/images/splash-icon.png")}
        />
      </Animated.View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 30,
          gap: 5,
        }}
      >
        <Typography variant="h1_b">Logit</Typography>
        <Typography color="#777777" variant="subtitle">
          Log the insight, do it now.
        </Typography>
      </View>
    </View>
  );
});
