import React from "react";
import { StyleSheet, View } from "react-native";

import useDebounce from "@/hooks/useDebounce";
import { Icon, Input } from "@rneui/themed";

type Props = {
  onSearch: (query: string) => void;
  delay?: number;
  placeholder?: string;
  defaultValue?: string;
};

export const DebouncedSearch = ({
  onSearch,
  delay = 500,
  placeholder = "Search...",
}: Props) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, delay);

  React.useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder}
        leftIcon={<Icon name="search" size={20} color="black" />}
        value={searchQuery}
        onChangeText={setSearchQuery}
        containerStyle={styles.inputContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  inputContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
