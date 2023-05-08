import React, { useRef } from "react";
import { Button, Input } from "@fast-monorepo/shared/index";
import useRestaurantsStore from "../../store/RestaurantStore";
import Modal from "../general/Modal";

const AddRestaurantModal = ({
    setVisible,
}: {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const name = useRef<HTMLInputElement>(null!);
    const address = useRef<HTMLInputElement>(null!);
    const city = useRef<HTMLInputElement>(null!);

    const errLabel = useRef<HTMLParagraphElement>(null!);

    const { addRestaurant } = useRestaurantsStore((state) => state);
    return (
        <Modal setVisible={setVisible}>
            <div className="flex flex-col gap-4">
                <Input ref={name} label="Restaurants name" type="text" />
                <Input ref={city} label="Restaurants city" type="text" />
                <Input ref={address} label="Restaurants address" type="text" />

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
                                setVisible(false);
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
