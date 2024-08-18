import { MMKV } from "react-native-mmkv";
import { create, StateCreator } from "zustand";
import { persist, PersistOptions, StorageValue } from "zustand/middleware";

import { User } from "@/@types";

type UserStore = {
  users: User[];
  addUser: (user: Omit<User, "id">) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: string) => void;
};

const storage = new MMKV();

const persistedStore = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, storeSnapshot: StorageValue<UserStore>) => {
    storage.set(name, JSON.stringify(storeSnapshot));
  },
  removeItem: (name: string) => {
    storage.delete(name);
  },
};

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>;

export const useUserStore = create<UserStore>(
  (persist as MyPersist)(
    (set) => ({
      users: [],
      addUser: (user: Omit<User, "id">) =>
        set((state) => ({
          users: [...state.users, { ...user, id: `${state.users.length + 1}` }],
        })),
      updateUser: (updatedUser: User) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          ),
        })),
      deleteUser: (userId: string) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== userId),
        })),
    }),
    {
      name: "user-store",
      storage: persistedStore,
    }
  )
);
