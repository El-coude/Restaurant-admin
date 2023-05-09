import { useEffect, useRef, useState } from "react";
import { Button, Input } from "@fast-monorepo/shared/index";
import useRestaurantsStore from "../../store/RestaurantStore";
import Modal from "../general/Modal";
import PickFromMap from "../general/Map";

const AddRestaurantModal = ({ close }: { close: () => void }) => {
    const name = useRef<HTMLInputElement>(null!);
    const address = useRef<HTMLInputElement>(null!);
    const city = useRef<HTMLInputElement>(null!);

    const errLabel = useRef<HTMLParagraphElement>(null!);

    const { addRestaurant } = useRestaurantsStore((state) => state);

    const [map, setMap] = useState({
        visible: false,
        lang: 1.105,
        lat: 34.906,
    });

    console.log(map);

    return (
        <Modal close={close}>
            <div className="flex flex-col gap-4">
                <Input ref={name} label="Restaurants name" type="text" />
                <Input ref={city} label="Restaurants city" type="text" />
                <label>Address - choose an address from map</label>
                <Button
                    label="Open map"
                    onClick={() =>
                        setMap((prev) => ({
                            ...prev,
                            visible: true,
                        }))
                    }
                />
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
                {/*   <AddressAutofill accessToken="pk.eyJ1IjoiY2hha2VyMTciLCJhIjoiY2xoZDhrMnJ3MTk4dTNxcWZsNmF1bGw5ZiJ9.gOcmLycKZha9lTLl_HPp6Q">
                    <Input
                        ref={address}
                        label="Restaurants address"
                        type="text"
                        autocomplete="address-level1"
                    />
                </AddressAutofill> */}
                <p className="text-rose-500" ref={errLabel}></p>
                <Button
                    label="Confirm"
                    ocbButton
                    onClick={() =>
                        addRestaurant(
                            {
                                name: name.current.value,
                                city: city.current.value,
                                address: address.current.value,
                            },
                            () => {
                                close();
                            },
                            (err) =>
                                (errLabel.current.innerText =
                                    "Could not add Restaurants")
                        )
                    }
                />
            </div>
        </Modal>
    );
};

export default AddRestaurantModal;
