import { useEffect, useRef } from "react";
import { Input } from "@fast-monorepo/shared/index";
import useDeliversStore, { Deliver } from "../../store/DeliverStore";
import Modal from "../general/Modal";
import { useForm } from "react-hook-form";
import useRestaurantStore from "../../store/RestaurantStore";
import { ImSpinner2 } from "react-icons/im";

const AddDeliverModal = ({
    close,
    onSuccess,
}: {
    close: () => void;
    onSuccess?: () => void;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const add = (info: any) => {
        addDeliver(
            {
                name: info.name,
                email: info.email,
                phone: info.phone,
                restaurantId: 1,
            },
            () => {
                close();
            },
            (err) => (errLabel.current.innerText = "Could not add Deliver")
        );
    };

    const errLabel = useRef<HTMLParagraphElement>(null!);
    const { addDeliver } = useDeliversStore((state) => state);
    const { restaurants, getRestaurants, loading } = useRestaurantStore(
        (state) => state
    );
    useEffect(() => {
        if (!restaurants.length) {
            getRestaurants();
        }
    }, []);
    return (
        <Modal close={close}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(add)}>
                <Input
                    label="Deliver's name"
                    type="text"
                    {...register("name", { required: true })}
                />

                {errors.name && (
                    <p className="text-error text-sm">Name can't be empty</p>
                )}

                <Input
                    label="Deliver's email"
                    type="text"
                    {...register("email", {
                        pattern:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        required: true,
                    })}
                />
                {errors.email?.type == "required" && (
                    <p className="text-error text-sm">Email can't be empty</p>
                )}
                {errors.email?.type == "pattern" && (
                    <p className="text-error text-sm">Unvalid email format</p>
                )}

                <Input
                    label="Deliver's phone"
                    type="text"
                    {...register("phone", {
                        pattern: /^\d{10}$/,
                        required: true,
                    })}
                />
                {errors.phone?.type == "required" && (
                    <p className="text-error text-sm">Phone can't be empty</p>
                )}
                {errors.phone?.type == "pattern" && (
                    <p className="text-error text-sm">Unvalid phone format</p>
                )}

                <label htmlFor="">
                    Choose which restaurant the delivery is related to
                </label>
                {loading ? (
                    <>
                        <ImSpinner2 className="spinner m-auto" />
                        <p className="text-center text-gray-500">
                            Loading resaurants
                        </p>
                    </>
                ) : (
                    <select
                        className="bg-white p-2 border border-black rounded-lg py-3"
                        defaultValue={-1}
                        {...register("restaurant", {
                            min: 0,
                        })}>
                        {restaurants.map((rest) => (
                            <option value={rest.id}>
                                {rest.name} ( {rest.address}, {rest.city} )
                            </option>
                        ))}
                    </select>
                )}

                {errors.restaurant && (
                    <p className="text-error text-sm">
                        You must select a restaurant
                    </p>
                )}
                <p className="text-rose-500" ref={errLabel}></p>
                <button
                    type="submit"
                    className="btn btn-secondary btn-block text-white">
                    Confirm
                </button>
            </form>
        </Modal>
    );
};

export default AddDeliverModal;
