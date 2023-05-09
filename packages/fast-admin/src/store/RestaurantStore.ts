import axios, { AxiosError } from "axios";
import { create } from "zustand";
import useAuthStore from "./authStore";
import { API_URL } from "@fast-monorepo/shared/index";
import { Manager } from "./ManagerStore";

const useRestaurantStore = create<RestaurantStoreType>()((set, get) => ({
    restaurants: [],
    loading: false,
    error: false,
    getRestaurants: async () => {
        try {
            set(() => ({ loading: true, error: false }));
            const res = await axios.get(API_URL + "/restaurant", {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                restaurants: res.data.map((co: Restaurant) => {
                    return co;
                }),
            });
            set(() => ({ loading: false }));
        } catch (error) {
            console.log(error);
            set(() => ({ loading: false, error: true }));
        }
    },
    addRestaurant: async (restaurant, onSuccess, onFail) => {
        try {
            await axios.post(API_URL + "/restaurant/create", restaurant, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                restaurants: [...get().restaurants, restaurant],
            });
            onSuccess();
        } catch (error) {
            onFail(error as AxiosError);
        }
    },
    removeRestaurant: async (id) => {
        try {
            await axios.delete(API_URL + "/restaurant/" + id, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                restaurants: useRestaurantStore
                    .getState()
                    .restaurants.filter((co) => co.id !== id),
            });
            /* onSuccess(); */
        } catch (error) {
            /* onFail(error as AxiosError); */
        }
    },
}));

export type RestaurantStoreType = {
    restaurants: Restaurant[];
    loading: boolean;
    error: boolean;
    getRestaurants: () => void;
    addRestaurant: (
        restaurant: Restaurant,
        onSuccess: () => void,
        onFail: (err: AxiosError) => void
    ) => void;
    removeRestaurant: (id: number) => void;
};

export type Restaurant = {
    id?: number;
    name: string;
    city: string;
    address: string;
    manager?: Manager;
};

export default useRestaurantStore;
