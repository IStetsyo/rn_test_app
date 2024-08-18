import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View, StyleSheet } from "react-native";

import { User, UserSchema } from "@/@types";
import { useUserStore } from "@/store/users.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Text } from "@rneui/themed";

const getValidParameter = (param: string | string[] | undefined) => {
  if (!param) return "";
  if (Array.isArray(param)) return param[0];
  return param;
};

export default function Modal() {
  const router = useRouter();
  const { id, firstName, lastName, email, imageURL, isEdit } =
    useLocalSearchParams();

  const [addUser, updateUser] = useUserStore((state) => [
    state.addUser,
    state.updateUser,
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: getValidParameter(firstName),
      lastName: getValidParameter(lastName),
      email: getValidParameter(email),
      imageURL: getValidParameter(imageURL),
    },
  });

  const onSubmit = (data: Omit<User, "id">) => {
    if (isEdit === "true") {
      updateUser({ id: getValidParameter(id), ...data });
    } else {
      addUser({ ...data });
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.text}>
        {isEdit === "true" ? "Edit User" : "Add User"}
      </Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <Input
            label="First Name"
            placeholder="Enter first name"
            errorMessage={errors.firstName?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <Input
            label="Last Name"
            errorMessage={errors.lastName?.message}
            placeholder="Enter last name"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            label="Email"
            errorMessage={errors.email?.message}
            placeholder="Enter email"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="imageURL"
        render={({ field }) => (
          <Input
            label="Logo URL"
            errorMessage={errors.imageURL?.message}
            placeholder="Enter logo URL"
            {...field}
          />
        )}
      />
      <Button
        radius="md"
        size="lg"
        title={isEdit === "true" ? "Update" : "Add"}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  text: { marginBottom: 24, fontWeight: "bold" },
});
