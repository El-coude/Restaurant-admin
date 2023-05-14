import axios, { AxiosError } from "axios";
import { create } from "zustand";
import useAuthStore from "./authStore";
import { API_URL } from "@fast-monorepo/shared/index";

const useDeliverStore = create<DeliverStoreType>()((set) => ({
    delivers: [],
    getDelivers: async () => {
        try {
            const res = await axios.get(API_URL + "/deliverymen", {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                delivers: res.data.map((co: Deliver) => {
                    return co;
                }),
            });
        } catch (error) {
            console.log(error);
        }
    },
    addDeliver: async (Deliver, onSuccess, onFail) => {
        try {
            await axios.post(API_URL + "/deliverymen/create", Deliver, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                delivers: [...useDeliverStore.getState().delivers, Deliver],
            });
            onSuccess();
        } catch (error) {
            onFail(error as AxiosError);
        }
    },
    removeDeliver: async (id) => {
        try {
            await axios.delete(API_URL + "/deliverymen/" + id, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                delivers: useDeliverStore
                    .getState()
                    .delivers.filter((co) => co.id !== id),
            });
            /* onSuccess(); */
        } catch (error) {
            /* onFail(error as AxiosError); */
        }
    },
}));

export type DeliverStoreType = {
    delivers: Deliver[];
    getDelivers: () => void;
    addDeliver: (
        Deliver: Deliver,
        onSuccess: () => void,
        onFail: (err: AxiosError) => void
    ) => void;
    removeDeliver?: (id: number) => void;
};

export type Deliver = {
    id?: number;
    name: string;
    email: string;
    phone: string;
    restaurantId: number;
};

export default useDeliverStore;
