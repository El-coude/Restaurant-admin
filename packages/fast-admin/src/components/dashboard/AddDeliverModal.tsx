import { useEffect, useRef } from "react";
import { Input } from "@fast-monorepo/shared/index";
import useDeliversStore, { Deliver } from "../../store/DeliverStore";
import Modal from "../general/Modal";
import { useForm } from "react-hook-form";
import useRestaurantStore from "../../store/RestaurantStore";
import { ImSpinner2 } from "react-icons/im";

const AddDeliverModal = ({
    close,
    action = "create",
    prevValues,
}: {
    close: () => void;
    action?: "update" | "create";
    prevValues?: Deliver;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const { addDeliver, updateDeliver } = useDeliversStore((state) => state);

    const submit = (info: any) => {
        if (action == "create")
            addDeliver(
                {
                    name: info.name,
                    email: info.email,
                    phone: "+213" + info.phone,
                    restaurantId: +info.restaurant,
                },
                () => {
                    close();
                },
                (err) => (errLabel.current.innerText = err)
            );
        else
            updateDeliver(
                {
                    id: prevValues?.id,
                    name: info.name,
                    email: info.email,
                    phone: "+213" + info.phone,
                    restaurantId: +info.restaurant,
                },
                () => {
                    close();
                },
                (err) => (errLabel.current.innerText = err)
            );
    };

    const errLabel = useRef<HTMLParagraphElement>(null!);
    const { restaurants, getRestaurants, loading } = useRestaurantStore(
        (state) => state
    );
    useEffect(() => {
        if (!restaurants.length) {
            getRestaurants();
            setValue("restaurant", `${prevValues?.restaurantId}` || "-1");
        }
    }, []);
    return (
        <Modal close={close}>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(submit)}>
                <Input
                    label="Deliver's name"
                    type="text"
                    defaultValue={prevValues?.name}
                    {...register("name", { required: true })}
                />

                {errors.name && (
                    <p className="text-error text-sm">Name can't be empty</p>
                )}

                <Input
                    label="Deliver's email"
                    type="text"
                    defaultValue={prevValues?.email}
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

                <label>Deliver's phone</label>
                <div className="flex items-end gap-1">
                    <div className="bg-slate-50 rounded-md border border-black p-2">
                        +213
                    </div>
                    <Input
                        type="text"
                        defaultValue={prevValues?.phone.slice(4)}
                        {...register("phone", {
                            pattern: /^\d{9}$/,
                            required: true,
                        })}
                    />
                </div>
                {errors.phone?.type == "required" && (
                    <p className="text-error text-sm">Phone can't be empty</p>
                )}
                {errors.phone?.type == "pattern" && (
                    <p className="text-error text-sm">Unvalid phone format</p>
                )}

                <label>
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
                        defaultValue={prevValues?.restaurantId || -1}
                        {...register("restaurant", {
                            min: 0,
                        })}>
                        {restaurants.map((rest) => (
                            <option key={rest.id} value={rest.id}>
                                {rest.name} ( {rest.address} )
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
                    className="btn btn-secondary btn-block text-white flex gap-2">
                    {loading && <ImSpinner2 className="spinner" size={14} />}
                    Confirm
                </button>
            </form>
        </Modal>
    );
};

export default AddDeliverModal;
