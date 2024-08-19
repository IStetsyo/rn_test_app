import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "@rneui/themed";

import { DebouncedSearch } from "../DebounceSearch";

const addIcon = {
  name: "plus",
  type: "material-community",
  size: 20,
  color: "white",
};

type Props = {
  onSearch: (query: string) => void;
};

export const UserSearch = ({ onSearch }: Props) => {
  const navigation = useNavigation();

  const onUserAdd = () => {
    //@ts-ignore
    navigation.navigate("modal", { isEdit: false });
  };

  return (
    <View style={styles.container}>
      <DebouncedSearch onSearch={onSearch} />
      <Button radius="md" onPress={onUserAdd} icon={addIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    columnGap: 10,
    paddingHorizontal: 24,
  },
});
