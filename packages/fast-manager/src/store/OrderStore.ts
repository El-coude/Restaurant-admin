import axios, { AxiosError } from "axios";
import { create } from "zustand";
import useAuthStore from "./authStore";
import { API_URL } from "@fast-monorepo/shared/index";

const useOrderStore = create<OrderStoreType>()((set) => ({
    orders: [],
    loading: false,
    error: "",

    getOrders: async () => {
        set(() => ({ loading: true, error: "" }));
        try {
            const res = await axios.get(API_URL + "/orders", {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                orders: res.data.map((co: Order | any) => {
                    return {
                        ...co,
                        images: co.images?.map((img: any) => img.url),
                        categoryIds: co.categories?.map(
                            (cat: any) => cat.categoryId
                        ),
                    };
                }),
                loading: false,
            });
        } catch (error) {
            set(() => ({ loading: false, error: (error as Error).message }));
            console.log(error);
        }
    },
    addOrder: async (Order, onSuccess, onFail) => {
        set(() => ({ loading: true }));

        try {
            await axios.post(API_URL + "/orders/create", Order, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });

            set(({ orders }) => ({
                orders: [...orders, Order],
                loading: false,
            }));
            onSuccess();
        } catch (error: any) {
            set(() => ({ loading: false }));
            onFail(error.response?.data?.message[0]);
        }
    },
    updateOrder: async (Order, onSuccess, onFail) => {
        const { id, ...rest } = Order;
        set(() => ({ loading: true }));
        try {
            await axios.patch(
                API_URL + "/orders/" + id,
                { ...rest },
                {
                    headers: {
                        Authorization:
                            "Bearer " + useAuthStore.getState().auth?.token,
                    },
                }
            );
            set(({ orders }) => ({
                orders: orders.map((del) => {
                    if (del.id === id) return Order;
                    return del;
                }),
                loading: false,
            }));
            console.log(Order);
            onSuccess();
        } catch (error: any) {
            set({ loading: false });
            onFail(error.response?.data?.message[0]);
        }
    },
    removeOrder: async (id) => {
        try {
            await axios.delete(API_URL + "/orders/" + id, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set(({ orders }) => ({
                orders: orders.filter((co) => co.id !== id),
            }));
            /* onSuccess(); */
        } catch (error) {
            /* onFail(error as AxiosError); */
        }
    },
}));

export type OrderStoreType = {
    orders: Order[];
    loading: boolean;
    error: string;
    getOrders: () => void;
    addOrder: (
        Order: Order,
        onSuccess: () => void,
        onFail: (err: string) => void
    ) => void;
    updateOrder: (
        Order: Order,
        onSuccess: () => void,
        onFail: (err: string) => void
    ) => void;
    removeOrder: (id: number) => void;
};

export type Order = {
    id?: number;
    name: string;
    price: number;
    description: string;
    images: string[];
    categoryIds: number[];
    restaurantId: number;
};

export default useOrderStore;
