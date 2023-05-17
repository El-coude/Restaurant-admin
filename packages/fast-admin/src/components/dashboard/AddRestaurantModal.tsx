import { useEffect, useRef, useState } from "react";
import { Button, Input } from "@fast-monorepo/shared/index";
import useRestaurantsStore, { Restaurant } from "../../store/RestaurantStore";
import Modal from "../general/Modal";
import PickFromMap from "../general/Map";
import { ImSpinner2 } from "react-icons/im";

const AddRestaurantModal = ({
    close,
    action,
    prevValues,
}: {
    close: () => void;
    action: "update" | "create";
    prevValues?: Restaurant;
}) => {
    const name = useRef<HTMLInputElement>(null!);
    const errLabel = useRef<HTMLParagraphElement>(null!);

    const { addRestaurant, updateRestaurant, loading } = useRestaurantsStore(
        (state) => state
    );

    const [map, setMap] = useState<{
        visible: boolean;
        longtitud?: number;
        latitud?: number;
        address?: string;
    }>({
        visible: false,
        longtitud: prevValues?.longtitud,
        latitud: prevValues?.latitud,
        address: prevValues?.address,
    });

    return (
        <Modal close={close}>
            <div className="flex flex-col gap-4">
                <Input
                    ref={name}
                    label="Restaurants name"
                    type="text"
                    defaultValue={prevValues?.name}
                />
                <label>Address - choose an address from map</label>
                <button
                    className="btn btn-ghost btn-outline font-medium"
                    onClick={() =>
                        setMap((prev) => ({
                            ...prev,
                            visible: true,
                        }))
                    }>
                    {map.address || "Open map"}
                </button>
                {map.visible && (
                    <PickFromMap
                        close={() =>
                            setMap((prev) => ({
                                ...prev,
                                visible: false,
                            }))
                        }
                        setInfo={setMap}
                    />
                )}
                <p className="text-rose-500" ref={errLabel}></p>
                <button
                    className="btn btn-secondary text-white flex gap-2"
                    onClick={() => {
                        if (name.current.value && map.longtitud) {
                            const _data = {
                                name: name.current.value,
                                latitud: map.latitud!,
                                longtitud: map.longtitud!,
                                address: map.address || "",
                            };
                            if (action == "create")
                                addRestaurant(
                                    _data,
                                    () => {
                                        close();
                                    },
                                    (err) =>
                                        (errLabel.current.innerText =
                                            "Could not add estaurant")
                                );
                            else
                                updateRestaurant(
                                    {
                                        ..._data,
                                        id: prevValues?.id,
                                        manager: prevValues?.manager,
                                    },
                                    () => {
                                        close();
                                    },
                                    (err) =>
                                        (errLabel.current.innerText =
                                            "Could not update restaurant")
                                );
                        } else {
                            errLabel.current.innerText = "Enter information";
                        }
                    }}>
                    {loading && <ImSpinner2 className="spinner" size={14} />}
                    Confirm
                </button>
            </div>
        </Modal>
    );
};

export default AddRestaurantModal;
