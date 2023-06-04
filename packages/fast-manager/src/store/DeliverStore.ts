import axios, { AxiosError } from "axios";
import { create } from "zustand";
import useAuthStore from "./authStore";
import { API_URL } from "@fast-monorepo/shared/index";

const useDeliverStore = create<DeliverStoreType>()((set) => ({
    delivers: [],
    loading: false,
    error: "",

    getDelivers: async () => {
        set(() => ({ loading: true, error: "" }));
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
                loading: false,
            });
        } catch (error) {
            set(() => ({ loading: false, error: (error as Error).message }));
            console.log(error);
        }
    },
    addDeliver: async (Deliver, onSuccess, onFail) => {
        set(() => ({ loading: true }));

        try {
            await axios.post(API_URL + "/deliverymen/create", Deliver, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });

            set(({ delivers }) => ({
                delivers: [
                    ...delivers,
                    {
                        ...Deliver,
                    },
                ],
                loading: false,
            }));
            onSuccess();
        } catch (error: any) {
            set(() => ({ loading: false }));
            onFail(error.response?.data?.message[0]);
        }
    },
    updateDeliver: async (Deliver, onSuccess, onFail) => {
        const { id, ...rest } = Deliver;
        set(() => ({ loading: true }));
        console.log(id);
        try {
            await axios.patch(
                API_URL + "/deliverymen/" + id,
                { ...rest },
                {
                    headers: {
                        Authorization:
                            "Bearer " + useAuthStore.getState().auth?.token,
                    },
                }
            );
            set(({ delivers }) => ({
                delivers: delivers.map((del) => {
                    if (del.id === id) return { ...Deliver };
                    return del;
                }),
                loading: false,
            }));
            console.log(Deliver);
            onSuccess();
        } catch (error: any) {
            set({ loading: false });
            onFail(error.response?.data?.message[0]);
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
            set(({ delivers }) => ({
                delivers: delivers.filter((co) => co.id !== id),
            }));
            /* onSuccess(); */
        } catch (error) {
            /* onFail(error as AxiosError); */
        }
    },
}));

export type DeliverStoreType = {
    delivers: Deliver[];
    loading: boolean;
    error: string;
    getDelivers: () => void;
    addDeliver: (
        Deliver: Deliver,
        onSuccess: () => void,
        onFail: (err: string) => void
    ) => void;
    updateDeliver: (
        Deliver: Deliver,
        onSuccess: () => void,
        onFail: (err: string) => void
    ) => void;
    removeDeliver: (id: number) => void;
};

export type Deliver = {
    id?: number;
    name: string;
    email: string;
    phone: string;
    restaurantId: number;
};

export default useDeliverStore;
