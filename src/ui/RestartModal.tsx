import {
  StyleSheet,
  Text,
  View,
  Modal,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";

type Props = {
  score: string;
  modalVisible: boolean;
  onRestart: () => void;
  didPlayerWin: boolean;
};

const RestartModal = ({
  score,
  modalVisible,
  onRestart,
  didPlayerWin,
}: Props) => {
  const { width } = useWindowDimensions();
  const cardWidth = width - 80;
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.container}>
        <View
          style={[
            styles.card,
            {
              width: cardWidth,
              height: cardWidth,
            },
          ]}
        >
          <View
            style={[
              styles.innerCard,
              {
                width: cardWidth,
                height: cardWidth - 4,
              },
            ]}
          >
            <Text style={styles.textStyle}>
              {didPlayerWin ? `Congratulation 🎉` : "You lost 😞"}
            </Text>
            <Text
              style={styles.textStyle}
            >{`Your final score is: ${score}`}</Text>
            <Pressable onPress={() => onRestart()} style={styles.btnStyle}>
              <Text style={styles.btnTextStyle}>RESTART</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export { RestartModal };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323CC",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#2D0B4F",
    borderRadius: 20,
    overflow: "hidden",
  },
  innerCard: {
    backgroundColor: "#9894F9",
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  btnStyle: {
    backgroundColor: "#FED201",
    height: 40,
    width: 150,
    borderRadius: 40 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FDE103",
  },
  btnTextStyle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#A06103",
  },
  textStyle: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});
