import React from "react";
import { Rect } from "@shopify/react-native-skia";
import { SharedValue, useDerivedValue } from "react-native-reanimated";
import { TILE_BG, TILE_BG_SELECTED } from "../constants";

type Props = {
  position: number;
  index: number;
  progress: SharedValue<number>;
  pressedItems: SharedValue<Array<number>>;
  tileWidth: number;
  tileHeight: number;
};

const Tile = ({
  position,
  index,
  progress,
  pressedItems,
  tileWidth,
  tileHeight,
}: Props) => {
  const animatedY = useDerivedValue(() => progress.value - tileHeight * index);
  const animatedBG = useDerivedValue(() =>
    pressedItems.value.includes(index) ? TILE_BG_SELECTED : TILE_BG
  );
  return (
    <Rect
      x={tileWidth * position}
      y={animatedY}
      color={animatedBG}
      height={tileHeight}
      width={tileWidth}
    />
  );
};

export { Tile };
