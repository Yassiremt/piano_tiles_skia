import { useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { Canvas } from "@shopify/react-native-skia";
import { Background, Score, Separators, Tile } from "./skia_ui";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { happyBirthday } from "./songs";
import { generateTiles } from "./helpers";
import { useNotesLoader } from "./hooks";
import { RestartModal } from "./ui";

type Props = {};

const DURATION = 6.5;
const TILE_HEIGHT = 200;

const PianoTiles = (props: Props) => {
  const { width, height } = useWindowDimensions();
  const [notesSounds] = useNotesLoader();
  const tileWidth = width / 4;

  const nbrOfTiles = happyBirthday.length;
  const tiles = generateTiles(nbrOfTiles);
  const pressedItems = useSharedValue<Array<number>>([]);
  const initialProgress = height - TILE_HEIGHT;
  const finalProgress = initialProgress + TILE_HEIGHT * nbrOfTiles;
  const progress = useSharedValue(initialProgress);
  const [restartModalVisible, setRestartModalVisible] = useState(false);

  const play = async (n: number) => {
    if (notesSounds) {
      const note = happyBirthday[n];
      const playedNote = notesSounds.find((ns: any) => ns.name === note);
      if (playedNote) await playedNote.sound.playFromPositionAsync(0);
    }
  };

  useAnimatedReaction(
    () => progress.value,
    (current) => {
      const currentTile = (current - initialProgress) / TILE_HEIGHT;
      if (
        Number.isInteger(currentTile) ||
        currentTile.toString().split(".")[1].slice(0, 1) === "0"
      ) {
        if (pressedItems.value.length < currentTile - 1) {
          cancelAnimation(progress);
          runOnJS(setRestartModalVisible)(true);
        }
      }
    }
  );

  const tapGesture = Gesture.Tap().onStart((e) => {
    const tappedPoint = e.x;

    const selectedTileIndex = tiles.findIndex((position, index) => {
      if (progress.value === initialProgress) {
        progress.value = withTiming(
          finalProgress,
          {
            duration: DURATION * 100 * nbrOfTiles,
            easing: Easing.linear,
          },
          () => runOnJS(setRestartModalVisible)(true)
        );
      }
      const tileX = tileWidth * position;
      const tileY = progress.value - TILE_HEIGHT * index;

      // Checking if the tapped point is inside the current rectangle
      return (
        tappedPoint >= tileX &&
        tappedPoint <= tileX + tileWidth &&
        e.y >= tileY &&
        e.y <= tileY + TILE_HEIGHT
      );
    });

    // If a rectangle was pressed we change its bgColor by adding it to pressedItems
    if (selectedTileIndex >= 0) {
      pressedItems.value = [...pressedItems.value, selectedTileIndex];
      runOnJS(play)(selectedTileIndex);
    }
  });
  const onGameRestart = () => {
    pressedItems.value = [];
    progress.value = initialProgress;
    setRestartModalVisible(false);
  };
  return (
    <>
      <GestureDetector gesture={tapGesture}>
        <Canvas style={{ flex: 1 }}>
          <Background />
          <Separators />
          {tiles.map((v, i) => (
            <Tile
              key={i}
              index={i}
              position={v}
              progress={progress}
              pressedItems={pressedItems}
              tileWidth={tileWidth}
              tileHeight={TILE_HEIGHT}
            />
          ))}
          <Score pressedItems={pressedItems} />
        </Canvas>
      </GestureDetector>
      <RestartModal
        score={pressedItems.value.length.toString()}
        modalVisible={restartModalVisible}
        onRestart={onGameRestart}
        didPlayerWin={pressedItems.value.length === happyBirthday.length}
      />
    </>
  );
};

export default PianoTiles;
