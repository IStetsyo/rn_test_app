import React from "react";
import { View, StyleSheet } from "react-native";

import { Button, Text } from "@rneui/themed";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <View style={styles.container}>
      <Button
        radius="md"
        title="Previous"
        style={styles.button}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
      />
      <Text
        style={styles.pageInfo}
      >{`Page ${currentPage} of ${totalPages}`}</Text>
      <Button
        radius="md"
        title="Next"
        style={styles.button}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
    paddingHorizontal: 24,
  },
  pageInfo: {
    fontSize: 16,
  },
  button: {
    width: 100,
  },
});
