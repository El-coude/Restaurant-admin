import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, LoginFn } from "@fast-monorepo/shared/index";

const useAuthStore = create<AuthStoreType>()(
    persist(
        (set) => ({
            auth: null,
            login: async (...args) => {
                const res = await login(...args);
                return set({
                    auth: {
                        token: res.data.admin.access_token,
                        email: args[0],
                        role: "superAdmin", //place holde
                    },
                });
            },
            logout() {
                return set({ auth: null });
            },
        }),
        {
            name: "auth",
            getStorage: () => localStorage,
        }
    )
);

export type AuthStoreType = {
    auth: Auth | null;
    login: (...args: Parameters<LoginFn>) => void;
    logout: () => void;
};

export type Auth = {
    token: string;
    email: string;
    role: "superAdmin" | "manager" | "superUser" | "user";
};

export default useAuthStore;
