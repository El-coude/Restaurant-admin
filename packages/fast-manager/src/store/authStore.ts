import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API_URL, login, LoginFn } from "@fast-monorepo/shared/index";
import { Restaurant } from "./RestaurantStore";
import axios from "axios";

const useAuthStore = create<AuthStoreType>()(
    persist(
        (set) => ({
            auth: null,
            login: async (...args) => {
                const res = await login(...args);
                return set({
                    auth: {
                        token: res.data.manager.access_token!,
                        restaurant: res.data.manager.restaurant!,
                        email: args[0],
                        name: res.data.manager.name,
                        id: res.data.manager.id,
                        role: "manager",
                    },
                });
            },
            logout() {
                return set({ auth: null });
            },

            changePass: async (token, pass) => {
                try {
                    const res = await axios.post(
                        API_URL +
                            "/manager/set-password/" +
                            encodeURIComponent(token),
                        {
                            password: pass,
                        }
                    );
                    return set({
                        auth: {
                            token: res.data.access_token!,
                            ...(res.data as Omit<Auth, "token">),
                            restaurant: res.data.manager.restaurant!,

                            role: "manager",
                        },
                    });
                } catch (error) {
                    console.log(error);
                    return;
                }
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
    changePass: (token: string, pass: string) => void;
};

export type Auth = {
    id?: number;
    token: string;
    email: string;
    name: string;
    restaurant?: Restaurant;
    restaurantId?: number;
    role: "superAdmin" | "manager" | "superUser" | "user";
};

export default useAuthStore;
