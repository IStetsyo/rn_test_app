import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { User } from "@/@types";
import { Avatar, Button, Card } from "@rneui/themed";

type Props = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
};

const editIcon = {
  name: "edit",
  type: "font-awesome",
  color: "white",
};

const deleteIcon = {
  name: "trash",
  type: "font-awesome",
  color: "white",
};

export const UserRow = ({ user, onDelete, onEdit }: Props) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.row}>
        <Avatar source={{ uri: user.imageURL }} rounded />
        <Text style={styles.itemText}>{user.firstName}</Text>
        <Text style={styles.itemText}>{user.lastName}</Text>
      </View>
      <View style={styles.emailContainer}>
        <Text style={styles.email}>Email: {user.email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          radius="md"
          title="Edit"
          icon={editIcon}
          onPress={() => onEdit(user)}
          iconContainerStyle={styles.iconContainer}
          iconRight
        />
        <Button
          radius="md"
          title="Delete"
          icon={deleteIcon}
          onPress={() => onDelete(user.id)}
          iconContainerStyle={styles.iconContainer}
          iconRight
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  email: { flex: 1, width: "100%" },
  itemText: {
    textAlign: "left",
    fontSize: 14,
  },
  emailContainer: {
    flexDirection: "row",
    columnGap: 10,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    columnGap: 10,
    paddingVertical: 10,
  },
  iconContainer: {
    marginLeft: 8,
  },
});
