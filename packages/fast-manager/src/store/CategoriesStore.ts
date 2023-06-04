import axios, { AxiosError } from "axios";
import { create } from "zustand";
import useAuthStore from "./authStore";
import { API_URL } from "@fast-monorepo/shared/index";

const useCategoryStore = create<CategoryStoreType>()((set) => ({
    categorys: [
        {
            name: "pizza",
            id: 1,
        },
        {
            name: "burger",
            id: 2,
        },
    ],
    getCategorys: async () => {
        try {
            const res = await axios.get(API_URL + "/category", {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set(() => ({
                categorys: res.data.map((co: Category) => {
                    return co;
                }),
            }));
        } catch (error) {
            console.log(error);
        }
    },
    addCategory: async (Category, onSuccess, onFail) => {
        try {
            await axios.post(API_URL + "/category/create", Category, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set(({ categorys }) => ({
                categorys: [...categorys, Category],
            }));
            onSuccess();
        } catch (error) {
            onFail(error as AxiosError);
        }
    },
}));

export type CategoryStoreType = {
    categorys: Category[];
    getCategorys: () => void;
    addCategory: (
        Category: Category,
        onSuccess: () => void,
        onFail: (err: AxiosError) => void
    ) => void;
    removeCategory?: (id: number) => void;
};

export type Category = {
    id?: number;
    name: string;
};

export default useCategoryStore;
