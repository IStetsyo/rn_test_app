import { useNavigation } from "expo-router";
import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { User } from "@/@types";
import { UserDeleteModal } from "@/components/UsersList/UserDeleteModal";
import { useUserStore } from "@/store/users.store";
import { Button } from "@rneui/themed";

import { UserRow } from "./UserRow";

type Props = {
  users: User[];
};

export const UsersList = ({ users }: Props) => {
  const [userToDelete, setUserToDelete] = React.useState<string | null>(null);
  const handleDeleteUser = useUserStore((state) => state.deleteUser);
  const navigation = useNavigation();

  const onUserAdd = () => {
    //@ts-ignore
    navigation.navigate("modal", { isEdit: false });
  };

  const onUserEdit = (userToEdit: User) => {
    //@ts-ignore
    navigation.navigate("modal", { ...userToEdit, isEdit: true });
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
  };

  const handleAcceptDeleteModal = () => {
    handleDeleteUser(userToDelete!);
    handleCloseDeleteModal();
  };

  const renderItem = React.useCallback(
    (props: ListRenderItemInfo<User>) => {
      return (
        <UserRow
          user={props.item}
          onEdit={onUserEdit}
          onDelete={setUserToDelete}
        />
      );
    },
    [users.length, onUserEdit, setUserToDelete]
  );

  if (users.length === 0) {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>
          No users found. But you can add a new one.
        </Text>
        <Button title="Add new user" radius="md" onPress={onUserAdd} />
      </View>
    );
  }
  return (
    <>
      <FlatList<User>
        data={users}
        renderItem={renderItem}
        style={styles.listContainer}
      />
      <UserDeleteModal
        isVisible={!!userToDelete}
        onConfirm={handleAcceptDeleteModal}
        onCancel={handleCloseDeleteModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 24,
  },
  emptyListText: {
    marginBottom: 24,
  },
  listContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 24,
  },
});
