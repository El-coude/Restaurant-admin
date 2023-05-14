import axios, { AxiosError } from "axios";
import { create } from "zustand";
import useAuthStore from "./authStore";
import { API_URL } from "@fast-monorepo/shared/index";

const useManagerStore = create<ManagerStoreType>()((set) => ({
    managers: [],
    getManagers: async () => {
        try {
            const res = await axios.get(API_URL + "/manager", {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                managers: res.data.map((co: Manager) => {
                    return co;
                }),
            });
        } catch (error) {
            console.log(error);
        }
    },
    addManager: async (manager, onSuccess, onFail) => {
        try {
            await axios.post(API_URL + "/manager/create", manager, {
                headers: {
                    Authorization:
                        "Bearer " + useAuthStore.getState().auth?.token,
                },
            });
            set({
                managers: [...useManagerStore.getState().managers, manager],
            });
            onSuccess();
        } catch (error) {
            onFail(error as AxiosError);
        }
    },
}));

export type ManagerStoreType = {
    managers: Manager[];
    getManagers: () => void;
    addManager: (
        manager: Manager,
        onSuccess: () => void,
        onFail: (err: AxiosError) => void
    ) => void;
    removeManager?: (id: number) => void;
};

export type Manager = {
    id?: number;
    restaurantId: number;
    name: string;
    email: string;
};

export default useManagerStore;
