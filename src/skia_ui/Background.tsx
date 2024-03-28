import { useWindowDimensions } from "react-native";
import React from "react";
import { LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { SELECTED_GRADIENT } from "../constants";

type Props = {};

const Background = (props: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <Rect x={0} y={0} width={width} height={height}>
      <LinearGradient
        start={vec(0, 0)}
        end={vec(0, height)}
        colors={SELECTED_GRADIENT}
      />
    </Rect>
  );
};

export { Background };
