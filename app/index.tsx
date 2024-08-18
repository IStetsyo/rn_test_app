import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import { Pagination } from "@/components/Pagination";
import { UserSearch } from "@/components/UsersList/UserSearch";
import { UsersList } from "@/components/UsersList/UsersList";
import { PAGE_SIZE } from "@/constants/Pagination";
import usePagination from "@/hooks/usePagination";
import { useUserStore } from "@/store/users.store";

export default function Index() {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const users = useUserStore((state) => state.users);

  const { height } = useWindowDimensions();

  //don't like to have this one before some hook but it should be here
  const filteredUsers = React.useMemo(() => {
    if (!searchQuery) return users;
    return users.filter(
      (user) =>
        user.firstName.includes(searchQuery) ||
        user.lastName.includes(searchQuery) ||
        user.email.includes(searchQuery)
    );
  }, [searchQuery, users]);

  const { paginatedData, setPage, currentPage, totalPages } = usePagination({
    data: filteredUsers,
    pageSize: PAGE_SIZE,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      <UserSearch onSearch={handleSearch} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <UsersList users={paginatedData} />
      {paginatedData.length * 150 >= height * 0.66 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
