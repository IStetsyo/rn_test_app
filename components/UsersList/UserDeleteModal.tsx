import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button, Overlay } from "@rneui/themed";

type Props = {
  isVisible: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
};

export const UserDeleteModal = ({ isVisible, onConfirm, onCancel }: Props) => {
  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onCancel}
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          Are you sure you want to delete this user?
        </Text>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" radius="md" onPress={onCancel} />
          <Button
            title="Delete"
            radius="md"
            onPress={onConfirm}
            color="error"
          />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 16,
  },
  container: {
    padding: 16,
  },
  text: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    columnGap: 10,
  },
});
