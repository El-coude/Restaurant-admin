import axios, { AxiosError } from "axios";
import { create } from "zustand";
import useAuthStore from "./authStore";
import { API_URL } from "@fast-monorepo/shared";

const useRestaurantStore = create<RestaurantStoreType>()((set) => ({
    restaurants: [],
    getRestaurants: async () => {
        try {
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
        } catch (error) {
            console.log(error);
        }
    },
    addRestaurant: async (restaurant, onSuccess, onFail) => {
        console.log(useAuthStore.getState().auth?.token);

        try {
            await axios.post(API_URL + "/restaurant/create", restaurant, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                restaurants: [
                    ...useRestaurantStore.getState().restaurants,
                    restaurant,
                ],
            });
            onSuccess();
        } catch (error) {
            onFail(error as AxiosError);
        }
    },
    /* removeRestaurant: async (email) => {
        set({
            restaurants: useRestaurantStore
                .getState()
                .restaurants.filter((co) => co.email !== email),
        });
    }, */
}));

export type RestaurantStoreType = {
    restaurants: Restaurant[];
    getRestaurants: () => void;
    addRestaurant: (
        restaurant: Restaurant,
        onSuccess: () => void,
        onFail: (err: AxiosError) => void
    ) => void;
    removeRestaurant?: (email: string) => void;
};

export type Restaurant = {
    name: string;
    city: string;
    address: string;
};

export default useRestaurantStore;
