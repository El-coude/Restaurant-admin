import axios, { AxiosError } from "axios";
import { create } from "zustand";
import useAuthStore from "./authStore";
import { API_URL } from "@fast-monorepo/shared/index";

const useMealStore = create<MealStoreType>()((set) => ({
    meals: [],
    loading: false,
    error: "",

    getMeals: async () => {
        set(() => ({ loading: true, error: "" }));
        try {
            const res = await axios.get(API_URL + "/meals", {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                meals: res.data.map((co: Meal | any) => {
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
    addMeal: async (Meal, onSuccess, onFail) => {
        set(() => ({ loading: true }));

        try {
            await axios.post(API_URL + "/meals/create", Meal, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });

            set(({ meals }) => ({
                meals: [...meals, Meal],
                loading: false,
            }));
            onSuccess();
        } catch (error: any) {
            set(() => ({ loading: false }));
            onFail(error.response?.data?.message[0]);
        }
    },
    updateMeal: async (Meal, onSuccess, onFail) => {
        const { id, ...rest } = Meal;
        set(() => ({ loading: true }));
        try {
            await axios.patch(
                API_URL + "/meals/" + id,
                { ...rest },
                {
                    headers: {
                        Authorization:
                            "Bearer " + useAuthStore.getState().auth?.token,
                    },
                }
            );
            set(({ meals }) => ({
                meals: meals.map((del) => {
                    if (del.id === id) return Meal;
                    return del;
                }),
                loading: false,
            }));
            console.log(Meal);
            onSuccess();
        } catch (error: any) {
            set({ loading: false });
            onFail(error.response?.data?.message[0]);
        }
    },
    removeMeal: async (id) => {
        try {
            await axios.delete(API_URL + "/meals/" + id, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set(({ meals }) => ({
                meals: meals.filter((co) => co.id !== id),
            }));
            /* onSuccess(); */
        } catch (error) {
            /* onFail(error as AxiosError); */
        }
    },
}));

export type MealStoreType = {
    meals: Meal[];
    loading: boolean;
    error: string;
    getMeals: () => void;
    addMeal: (
        Meal: Meal,
        onSuccess: () => void,
        onFail: (err: string) => void
    ) => void;
    updateMeal: (
        Meal: Meal,
        onSuccess: () => void,
        onFail: (err: string) => void
    ) => void;
    removeMeal: (id: number) => void;
};

export type Meal = {
    id?: number;
    name: string;
    price: string;
    description: string;
    images: string[];
    categoryIds: number[];
};

export default useMealStore;
