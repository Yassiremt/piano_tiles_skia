import React from "react";
import {
  Group,
  LinearGradient,
  RoundedRect,
  Shadow,
  Text,
  matchFont,
} from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { SCORE_FONT_SIZE } from "../constants";

type Props = {
  pressedItems: SharedValue<Array<number>>;
};

const Score = ({ pressedItems }: Props) => {
  const font = matchFont({ fontSize: SCORE_FONT_SIZE, fontWeight: "500" });

  const animatedText = useDerivedValue(() =>
    pressedItems.value.length.toString()
  );

  return (
    <Group>
      <RoundedRect r={35 / 2} height={35} width={140} x={15} y={30} />
      <LinearGradient
        start={{ x: 0, y: 15 }}
        end={{ x: 0, y: 65 }}
        colors={["#212121", "#343434", "#212121"]}
      />
      <Shadow inner color={"#FFFFFF88"} dx={0} dy={0} blur={2} />
      <Text text={"Score:"} x={40} y={54} font={font} color={"white"} />
      <Text text={animatedText} x={120} y={54} font={font} color={"white"} />
    </Group>
  );
};

export { Score };
