import "react-native-gesture-handler";
import React from "react";
import PianoTiles from "./src/PianoTiles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#121221" }}>
        <StatusBar translucent={true} backgroundColor={"transparent"} />
        <PianoTiles />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
